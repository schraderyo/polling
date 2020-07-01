export class Poll {
  id: number;
  title: string;
  questions: Question[];
  responses: number;

  PollAdapter(data: any): any {
    return data as any;
  }

  PollsAdapter(data: any): any[] {
    return data as any[];
  }
}

export class Question {
  id: number;
  question: string;
  answer: boolean;
}

export class Breakdown {
    questionId: number;
    question: string;
    percentPositive: number;
    percentNegative: number;
}

export class PollMetrics {
    id: number;
    pollId: number;
    userId: number;
    title: string;
    timestamp: string;
    results: Question[];
    status: string;
}

