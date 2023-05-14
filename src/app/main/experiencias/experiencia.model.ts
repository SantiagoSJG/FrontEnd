export class Experiencia {
    constructor(
        public id: number,
        public tipo: string,
        public nombre: string,
        public inicioPeriodo: Date,
        public finPeriodo: Date
    ) {}
}
