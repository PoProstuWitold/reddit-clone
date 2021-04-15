import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNickColumn1618478582304 implements MigrationInterface {
    name = 'AddNickColumn1618478582304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "nick" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_66dcc4532b5334c01ec92f8ceee" UNIQUE ("nick")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_66dcc4532b5334c01ec92f8ceee"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nick"`);
    }

}
