import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Feedback } from './feedback.schema';
import { FeedbacksService } from './feedback.service';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbacksService) {}

  @Query(() => [Feedback])
  getAllFeedback() {
    return this.feedbackService.getAllFeedbacks();
  }

  @Mutation(() => Feedback)
  async createFeedback(
    @Args('feedback') feedback: string,
    @Args('rating') rating: number // Accept image URL
  ) {
    return this.feedbackService.createFeedbacks(feedback, rating);
  }
}
