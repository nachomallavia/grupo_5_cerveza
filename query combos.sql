CREATE TABLE combos(
	id int(40) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(40) NOT NULL,
    description VARCHAR(80) NOT NULL,
    price SMALLINT(30) NOT NULL,
    image VARCHAR(40) NOT NULL
);

CREATE TABLE combos_products(
	id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_combo int(40) NOT NULL,
    id_product int(40) NOT NULL,
    amount int(40) NOT NULL,
	FOREIGN KEY (id_combo) REFERENCES combos(id),
    FOREIGN KEY (id_product) REFERENCES products(id)
);