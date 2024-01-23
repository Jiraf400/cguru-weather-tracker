import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeTemperatureNullable1706000884957 implements MigrationInterface {
    name = 'MakeTemperatureNullable1706000884957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`actions\` CHANGE \`temp_c\` \`temp_c\` float NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`actions\` CHANGE \`temp_c\` \`temp_c\` float NOT NULL`);
    }

}
