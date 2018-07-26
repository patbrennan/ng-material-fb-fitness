export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date; // option w/?
  state?: 'completed' | 'cancelled' | null;
}
