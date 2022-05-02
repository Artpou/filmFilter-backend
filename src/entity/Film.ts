import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Film {

    @PrimaryGeneratedColumn()
    film_id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    release_year: string

    @Column()
    language_id: number

    @Column()
    original_language_id: number

    @Column()
    rental_duration: number

    @Column()
    rental_rate: number

    @Column()
    length: number

    @Column()
    replacement_cost: number

    @Column()
    rating: string

    @Column()
    special_features: string
}
