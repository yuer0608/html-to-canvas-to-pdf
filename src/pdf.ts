import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function getElementPosition(element: any, parentElement: any, setName: string) {
    let actualPosition = element[setName]; // 这是获取元素距父元素顶部的距离
    let current = element.offsetParent; // 这是获取父元素
    while (current !== parentElement) {
        // 当它上面有元素时就继续执行
        actualPosition += current[setName]; // 这是获取父元素距它的父元素顶部的距离累加起来
        current = current.offsetParent; // 继续找父元素
    }
    return actualPosition;
}
const A4 = {
    width: 595.28,
    height: 841.89,
};
export function downLoadPdf(htmlStr: string, pdfName: string) {
    return new Promise((resolve, reject) => {
        const content = document.createElement('div');
        content.style.position = 'absolute';
        content.style.zIndex = '-1';
        content.style.top = '0';
        content.style.margin = 'auto';
        content.style.width = '895px';
        content.style.padding = '20px';
        content.style.color = 'rgb(34, 47, 62)';
        content.style.fontFamily = 'Helvetica, Arial, sans - serif';
        content.innerHTML = htmlStr;
        document.appendChild(content);

        const pageHeight = content.offsetHeight;
        const pageWidth = content.offsetWidth;
        html2canvas(content, {
            scrollY: -window.scrollY,
            windowWidth: pageWidth,
            windowHeight: pageHeight,
            logging: true,
            letterRendering: 1,
            allowTaint: false,
            useCORS: true,
        } as any)
            .then((canvas) => {
                const contentWidth = canvas.width;
                const contentHeight = canvas.height;

                const pageCurrHeight = (contentWidth / A4.width) * A4.height;
                let leftHeight = contentHeight;
                let position = 0;
                const imgWidth = A4.width;
                const imgHeight = (A4.width / contentWidth) * contentHeight;
                const pageData = canvas.toDataURL('image/jpeg', 1.0);
                // eslint-disable-next-line new-cap
                const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });

                const aDomList = [...content.getElementsByTagName('a')]?.map((dom: any) => {
                    const { offsetWidth, offsetHeight, href } = dom;
                    const top = getElementPosition(dom, content, 'offsetTop');
                    const left = getElementPosition(dom, content, 'offsetLeft');
                    const rate = A4.width / pageWidth;
                    const currLeft = rate * left;
                    const currTop = rate * top;
                    const currWidth = rate * offsetWidth;
                    const currHeight = rate * offsetHeight;
                    return {
                        href,
                        offsetWidth,
                        offsetHeight,
                        left,
                        top,
                        currLeft,
                        currTop,
                        currWidth,
                        currHeight,
                    };
                });

                // eslint-disable-next-line promise/always-return
                if (leftHeight < pageCurrHeight) {
                    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                    aDomList.forEach((element: any) => {
                        const { href, currLeft, currTop, currWidth, currHeight } = element;
                        pdf.link(currLeft, currTop, currWidth, currHeight, {
                            url: href,
                        });
                    });
                } else {
                    while (leftHeight > 0) {
                        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                        leftHeight -= pageCurrHeight;
                        // eslint-disable-next-line @typescript-eslint/no-loop-func
                        aDomList
                            // eslint-disable-next-line @typescript-eslint/no-loop-func
                            ?.filter((dom: any) => dom.currTop > -position && dom.currTop < A4.height - position)
                            // eslint-disable-next-line @typescript-eslint/no-loop-func
                            ?.forEach((element: any) => {
                                const { href, currLeft, currTop, currWidth, currHeight } = element;
                                pdf.link(currLeft, currTop + position, currWidth, currHeight, {
                                    url: href,
                                });
                            });
                        position -= A4.height;
                        if (leftHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }

                // eslint-disable-next-line promise/no-nesting
                pdf.save(`${pdfName}.pdf`, { returnPromise: true })
                    .then(() => {
                        document.removeChild(content);
                        resolve('');
                        return '';
                    })
                    .catch(() => {});
            })
            .catch((errors) => {});
    });
}
