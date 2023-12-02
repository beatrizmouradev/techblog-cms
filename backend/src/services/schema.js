import {
    MySqlColumn,
    int,
    mysqlTable,
    serial,
    varchar,
  } from 'drizzle-orm/mysql-core';

export const authorTable = mysqlTable('author', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 45 }).notNull(),
    avatar: varchar('avatar', { length: 2000 }).notNull(),
})

export const MAX_CONTENT_LENGTH = 50000
export const postTable = mysqlTable('post', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 45 }).notNull(),
    content: varchar('content', { length: MAX_CONTENT_LENGTH }).notNull(),
    image: varchar('image', { length: 2000 }).notNull(),
    authorId: int('authorId').notNull().references(() => authorTable.id),
    categoryId: int('categoryId').notNull().references(() => categoryTable.id)
})

/**
  * @type {import('drizzle-orm/mysql-core').MySqlTableWithColumns<{
    name: "category";
    schema: undefined;
    columns: {
        id: MySqlColumn<{
            name: "id";
            tableName: "category";
            dataType: "number";
            columnType: "MySqlSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        title: MySqlColumn<{
            name: "title";
            tableName: "post";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            baseColumn: never;
        }, object>;
        parent: MySqlColumn<{
            name: "id";
            tableName: "post";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "mysql";
}> }
*/
export const categoryTable = mysqlTable('category', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 45 }).notNull(),
    parent: int('parent')
})
