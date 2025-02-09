import { Module } from '@nestjs/common';
import { FeedbackResolver } from './feedback.resolver';
import { FeedbacksService } from './feedback.service';
import { MockFeedbacksDbFeedback } from './mock-feedbackdb.service';

@Module({
  providers: [FeedbackResolver, FeedbacksService, MockFeedbacksDbFeedback]
})
export class FeedbackModule {}
