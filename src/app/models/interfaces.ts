export interface Split {
    catcode: string,
    amount: number,
}

export interface Category {
    code: string,
    'parentcode'?: string,
    name: string,
}