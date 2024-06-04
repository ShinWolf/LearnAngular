import { SnapType } from "./snap-type.type";

export class FaceSnap {
    // Vraiable optional
    location?: string;

    constructor(public id: number, public title: string, public description: string, public imageUrl: string, public createdAt: Date, public snaps: number) {
    }

    addSnap(): void {
        this.snaps++
    }

    snap(snapType: SnapType) {
        snapType === 'snap' ? this.addSnap() : this.removeSnap();
    }

    removeSnap(): void {
        this.snaps--;
    }

    setLocation(location: string): void {
        this.location = location;
    }

    withLocation(location: string): FaceSnap {
        this.setLocation(location);
        return this;
    }
}