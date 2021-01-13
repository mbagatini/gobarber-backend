import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AlterProviderToUser1610499209999 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('appointment', 'provider');

		await queryRunner.addColumn('appointment', new TableColumn({
			name: 'provider_id',
			type: 'int',
			isNullable: true,
		}));

		await queryRunner.createForeignKey('appointment', new TableForeignKey({
			name: 'fk_appointment_user',
			columnNames: ['provider_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'user',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE'
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('appointment', 'fk_appointment_user');

		await queryRunner.dropColumn('appointment', 'provider_id');

		await queryRunner.addColumn('appointment', new TableColumn({
			name: 'provider',
			type: 'varchar',
		}));
	}

}
