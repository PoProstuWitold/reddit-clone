import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePostAndSubTables1618516849290 implements MigrationInterface {
    name = 'CreatePostAndSubTables1618516849290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sub" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "image_urn" character varying, "banner_urn" character varying, "nick" character varying, CONSTRAINT "UQ_e45db8a9bd5a3af6e3595628fb7" UNIQUE ("name"), CONSTRAINT "PK_aaa48ae541d7446ee5fff28e732" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e45db8a9bd5a3af6e3595628fb" ON "sub" ("name") `);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "identifier" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "body" text, "sub_name" character varying NOT NULL, "nick" character varying, "subName" character varying, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_47c6a2335c73e90d3cc15e724e" ON "post" ("identifier") `);
        await queryRunner.query(`CREATE INDEX "IDX_cd1bddce36edc3e766798eab37" ON "post" ("slug") `);
        await queryRunner.query(`ALTER TABLE "sub" ADD CONSTRAINT "FK_2e45ef6b64ece05737ffe8a3070" FOREIGN KEY ("nick") REFERENCES "user"("nick") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_7981409cedf1ae7adef80e6e9a1" FOREIGN KEY ("nick") REFERENCES "user"("nick") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_80b7dc4bd7a74e1c851f52445ec" FOREIGN KEY ("subName") REFERENCES "sub"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_80b7dc4bd7a74e1c851f52445ec"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_7981409cedf1ae7adef80e6e9a1"`);
        await queryRunner.query(`ALTER TABLE "sub" DROP CONSTRAINT "FK_2e45ef6b64ece05737ffe8a3070"`);
        await queryRunner.query(`DROP INDEX "IDX_cd1bddce36edc3e766798eab37"`);
        await queryRunner.query(`DROP INDEX "IDX_47c6a2335c73e90d3cc15e724e"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP INDEX "IDX_e45db8a9bd5a3af6e3595628fb"`);
        await queryRunner.query(`DROP TABLE "sub"`);
    }

}
