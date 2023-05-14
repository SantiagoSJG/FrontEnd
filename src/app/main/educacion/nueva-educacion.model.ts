export class NuevaEducacion {
    constructor(
        public tipo: string,
        public nombre: string,
        public inicioPeriodo: Date,
        public finPeriodo?: Date
    ) {}
}
