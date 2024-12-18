import sqlite3, {Database} from "sqlite3"
// export function init(): void {
//     const db = new sqlite3.Database('wishlist.db')
//     db.close()
// }

export class WhishlistDB {
    private db: Database

    constructor() {
        this.db = new sqlite3.Database('wishlist.db')
        this.initUserTable()
    }

    runSelect(sql: string): any {
        let tmp = []
        this.db.all(sql, (error, row) => {
            if (error) {
                throw error
            }
            // tmp.push(JSON.stringify(row))
            for(const line of row) {
                tmp.push(line)
                console.log(line, '123')
            }
        })
        return tmp
    }

    getConnection(): Database {
        return this.db
    }

    initUserTable(): void {
        try {
            this.db.run(`CREATE TABLE IF NOT EXISTS users
                         (
                             id       INTEGER PRIMARY KEY AUTOINCREMENT,
                             login    TEXT NOT NULL,
                             password TEXT NOT NULL
                         )`)
        } catch (e) {
            console.error('Ошибка при создании таблицы:', e.message)
            throw new Error('Error create table user')
        }
    }

    createUser(login: string, passwd: string): boolean {
        try {
            const sql = 'INSERT INTO users (login, password) VALUES (?, ?)'
            const stmt = this.db.prepare(sql)
            stmt.run(login, passwd)
            stmt.finalize()
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    getUsers(): void {
        const users = this.runSelect('SELECT * FROM users')
        console.log(users)
    }
}