import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export default class InitialMigration1632803155945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable ( 
            new Table ({
                name: 'category',
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            }) 
        )

        await queryRunner.createTable (
            new Table ({
                name: 'user',
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        )

        await queryRunner.createTable (
            new Table ({
                name: 'entries',
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "value",
                        type: "decimal"
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            }),
        )

        await queryRunner.addColumn("entries", new TableColumn({
            name: "category_id",
            type: "int"
        }));

        await queryRunner.addColumn("entries", new TableColumn({
            name: "user_id",
            type: "int"
        }));

        await queryRunner.addColumn("user", new TableColumn({
            name: "entries_id",
            type: "int"
        }));

        await queryRunner.createForeignKey("entries", new TableForeignKey({
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "category",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("entries", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("user", new TableForeignKey({
            columnNames: ["entries_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "entries",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const entries = await queryRunner.getTable("entries");
        const user = await queryRunner.getTable("user");
        
        const foreignKeyCategory = entries.foreignKeys.find(fk => fk.columnNames.indexOf("category_id") !== -1);
        await queryRunner.dropForeignKey("entries", foreignKeyCategory);

        const foreignKeyUser = entries.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
        await queryRunner.dropForeignKey("entries", foreignKeyUser);

        const foreignKeyEntries = user.foreignKeys.find(fk => fk.columnNames.indexOf("entries_id") !== -1);
        await queryRunner.dropForeignKey("user", foreignKeyEntries);

        await queryRunner.dropColumn("entries", "category_id")
        await queryRunner.dropColumn("entries", "user_id")
        await queryRunner.dropColumn("user", "entries_id")
        
        await queryRunner.dropTable("category")
        await queryRunner.dropTable("user")
        await queryRunner.dropTable("entries")
    }

}
