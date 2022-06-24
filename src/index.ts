import { client } from "./stuff/Client";
import * as admin from "firebase-admin";
admin.initializeApp();
client.connect();