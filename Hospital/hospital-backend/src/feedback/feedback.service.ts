import { Injectable } from '@nestjs/common';
import { MockFeedbacksDbFeedback } from './mock-feedbackdb.service';

@Injectable()
export class FeedbacksService {
    constructor(private readonly mockFeedbacksDbFeedback: MockFeedbacksDbFeedback) {}

    getAllFeedbacks() {
        return this.mockFeedbacksDbFeedback.getFeedbacks();
    }

    createFeedbacks(feedback: string, rating: number) {
        return this.mockFeedbacksDbFeedback.addFeedbacks({ feedback, rating });
    }
}
