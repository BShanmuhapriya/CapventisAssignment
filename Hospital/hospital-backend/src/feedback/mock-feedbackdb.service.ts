import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { Feedback } from "./feedback.schema";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MockFeedbacksDbFeedback {
    private feedbacks: any[] = [];

    constructor() {
        this.loadFeedbacksFromJson();
    }

    private loadFeedbacksFromJson() {
        try {
            const filePath = path.join(__dirname, '..', 'mockdatabase', 'feedback.json');
            const fileData = fs.readFileSync(filePath, 'utf-8');
            this.feedbacks = JSON.parse(fileData) as Feedback[];
        } catch (error) {
            console.error('Error loading feedbacks from JSON file:', error.message);
        }
    }

    getFeedbacks() {
        return this.feedbacks;
    }

    addFeedbacks(feedbacks: Partial<Feedback>) {
        const newFeedback = {
            id: uuid(),
            feedback: feedbacks.feedback || "",
            rating: feedbacks.rating || "", // Add support for imageUrl
        };
        this.feedbacks.push(newFeedback);
        return newFeedback; // Return newly created feedbacs
    }
}
