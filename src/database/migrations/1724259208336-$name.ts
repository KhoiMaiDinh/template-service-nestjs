import { MigrationInterface, QueryRunner } from "typeorm";

export class  $name1724259208336 implements MigrationInterface {
    name = ' $name1724259208336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "PK_745d8f43d3af10ab8247465e450"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "address_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "PK_7075006c2d82acfeb0ea8c5dce7" PRIMARY KEY ("address_id")`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "longitude" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "latitude" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "latitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "longitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "PK_7075006c2d82acfeb0ea8c5dce7"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id")`);
    }

}
