import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointments1610407260244 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'appointment',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'provider',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'date',
						type: 'timestamp',
						isNullable: false,
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('appointment');
	}

}
