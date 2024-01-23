import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActions1706000618062 implements MigrationInterface {
    name = 'AddActions1706000618062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`actions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`temp_c\` float NOT NULL, \`actionTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`request_result\` int NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`actions\` ADD CONSTRAINT \`FK_83a262823d7b54757fa07171b90\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`actions\` DROP FOREIGN KEY \`FK_83a262823d7b54757fa07171b90\``);
        await queryRunner.query(`DROP TABLE \`actions\``);
    }

}
