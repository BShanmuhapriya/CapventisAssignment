import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "util";

// Polyfill for Jest environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
