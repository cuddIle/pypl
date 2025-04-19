export interface Point {
    date: Date;
    value: number;
    labels: { [key: string]: string };
}


export interface DisplayPoint {
    date: string;
    [uinqueIdentifiers: string]: number | string;
}

export function pointsToDisplayPoints(points: Point[]): DisplayPoint[] {
    const groupedPoints = new Map<string, DisplayPoint>();

    points.forEach((point) => {
        const dateKey = point.date.toISOString().slice(0, 19); 
        const labelKey = labelToString(point.labels);

        if (!groupedPoints.has(dateKey)) {
            groupedPoints.set(dateKey, { date: dateKey });
        }

        groupedPoints.get(dateKey)![labelKey] = point.value;
    });


    return Array.from(groupedPoints.values());
}

export function pointsToUinqueIdentifiers(points: Point[]): string[] {
    return Array.from(new Set(points.flatMap((point) => labelToString(point.labels))));

}


export function serializePoint(point: Point): any {
    return {
        ...point,
        date: point.date.toISOString(), // Convert Date to ISO string
    };
}

export function deserializePoint(data: any): Point {
    return {
        ...data,
        date: new Date(data.date), // Convert ISO string back to Date
    };
}


export function labelToString(labels: { [key: string]: string }): string {
    return Object.entries(labels)
        .map(([key, value]) => `${key}-${value}`)
        .join(", ");
}