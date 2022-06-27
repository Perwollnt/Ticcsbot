import * as admin from "firebase-admin";
import { QuickDB } from 'quick.db';

const qdb = new QuickDB()

export class Database {
    db: admin.firestore.Firestore;
    constructor() {
        try {
            admin.initializeApp()
        } catch (error) {
            
        }
        qdb.deleteAll();
        this.db = admin.firestore()
    }

    async set(path: string, data: any) {
        const ref = this.db.doc(path);
        await qdb.set(path, data);
        await ref.set(data, { merge: true })
        return data;
    }

    async get(path: string, fromServer = false) {
        if(fromServer) {
            return await this.getFromServer(path);
        }
        return (await this.getFromCache(path)) || (await this.getFromServer(path));
    }

    private async getFromCache(path: string): Promise<any | null> {
        const data = await qdb.get(path);
        return data || null;
    }

    private async getFromServer(path: string) : Promise<any | null> {
        const doc = await this.db.doc(path).get()
        if(!doc.exists) return null;
        await qdb.set(path, doc.data());
        return doc.data();
    }

}