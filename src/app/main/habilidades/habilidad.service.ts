import { HttpClient } from "@angular/common/http";
import { Skill } from "./habilidad.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NuevaHabilidad } from "./nueva-habilidad.model";

@Injectable()
export class SkillService {
    constructor(private http: HttpClient) {}

    // skills: Skill[] = [
    //     // new Skill("HTML", 7),
    //     // new Skill("CSS", 5),
    //     // new Skill("Programación", 5),
    //     // new Skill("JavaScript", 5),
    //     // new Skill("Angular", 6)
    // ]

    getHabilidades():Observable<Skill[]> {
        return this.http.get<Skill[]>('https://portfoliobackend-cfdi.onrender.com/habilidades/traer')
    }

    postHabilidad(habilidad: NuevaHabilidad):Observable<NuevaHabilidad> {
        return this.http.post<NuevaHabilidad>('https://portfoliobackend-cfdi.onrender.com/habilidades/agregar', habilidad)
    }

    deleteHabilidad(id: number):Observable<Skill> {
        return this.http.delete<Skill>(`https://portfoliobackend-cfdi.onrender.com/habilidades/eliminar/${id}`)
    }

    putHabilidad(habilidad: Skill, id: number):Observable<Skill> {
        return this.http.put<Skill>(`https://portfoliobackend-cfdi.onrender.com/habilidades/editar/${id}`, habilidad)
    }
}