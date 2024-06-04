import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap";
import { SnapType } from "../models/snap-type.type";
import { HttpClient } from "@angular/common/http";
import { Observable, map, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FaceSnapsService {

    constructor(private http: HttpClient) { }

    generateId(): string {
        return crypto.randomUUID().substring(0, 8);
    }

    getFaceSnaps(): Observable<FaceSnap[]> {
        return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
    }

    snapFaceSnapById(faceSnapId: number, snapType: SnapType): Observable<FaceSnap> {
        return this.getFaceSnapById(faceSnapId).pipe(
            map(faceSnap => ({
                ...faceSnap,
                snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
            })),
            switchMap(updateFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updateFaceSnap))
        );
    }

    getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
        return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
    }

    addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
        return this.getFaceSnaps().pipe(
            map(facesnaps => [...facesnaps].sort((a, b) => a.id - b.id)),
            map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
            map(previousFaceSnap => ({
                ...formValue,
                snaps: 0,
                createdAt: new Date(),
                id: previousFaceSnap.id + 1
            })),
            switchMap(newFaceSnap => this.http.post<FaceSnap>("http://localhost:3000/facesnaps", newFaceSnap))
        );
    }
}