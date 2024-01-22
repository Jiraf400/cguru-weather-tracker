import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsers1705931985589 implements MigrationInterface {
    name = 'AddUsers1705931985589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`login\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fio\` varchar(255) NOT NULL, \`apiToken\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_2d443082eccd5198f95f2a36e2\` (\`login\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_2d443082eccd5198f95f2a36e2\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
