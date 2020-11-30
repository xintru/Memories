import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1606748901296 implements MigrationInterface {
    name = 'Initial1606748901296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Memory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_7bd0f02ce8edd44f4caab1532ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_has_memory" ("user_id" uuid NOT NULL, "memory_id" uuid NOT NULL, CONSTRAINT "PK_78eabf1d23a234931e3a8465c07" PRIMARY KEY ("user_id", "memory_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_421e86eebecf8132486b8248a0" ON "user_has_memory" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_906ffc261916b69490368938e7" ON "user_has_memory" ("memory_id") `);
        await queryRunner.query(`ALTER TABLE "user_has_memory" ADD CONSTRAINT "FK_421e86eebecf8132486b8248a01" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_has_memory" ADD CONSTRAINT "FK_906ffc261916b69490368938e75" FOREIGN KEY ("memory_id") REFERENCES "Memory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_has_memory" DROP CONSTRAINT "FK_906ffc261916b69490368938e75"`);
        await queryRunner.query(`ALTER TABLE "user_has_memory" DROP CONSTRAINT "FK_421e86eebecf8132486b8248a01"`);
        await queryRunner.query(`DROP INDEX "IDX_906ffc261916b69490368938e7"`);
        await queryRunner.query(`DROP INDEX "IDX_421e86eebecf8132486b8248a0"`);
        await queryRunner.query(`DROP TABLE "user_has_memory"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Memory"`);
    }

}
