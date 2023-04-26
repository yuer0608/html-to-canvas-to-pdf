declare function downLoadPdf(htmlStr: string, pdfName: string): Promise<unknown>;

declare const Greeter: (name: string) => string;

export { Greeter, downLoadPdf };
