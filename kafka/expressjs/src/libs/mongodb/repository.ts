export interface Repository {
    create(doc: any): Promise<any>
    readMany(limit: number, page: number): Promise<any>
    readOne(id: string): Promise<any>
    update(id: string, update: any): Promise<any>
    delete(id: string): Promise<any>
}