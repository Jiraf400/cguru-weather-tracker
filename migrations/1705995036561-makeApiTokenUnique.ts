import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeApiTokenUnique1705995036561 implements MigrationInterface {
    name = 'MakeApiTokenUnique1705995036561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_b0639900c8ec98ffcc9449b774\` (\`apiToken\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_b0639900c8ec98ffcc9449b774\``);
    }

}
