create table cars (
  id uuid primary key default gen_random_uuid(),
  brand varchar(255) not null,
  model varchar(255) not null,
  license_plate varchar(255) not null unique,
  vin_number varchar(255) not null unique
);

create table discounts (
  id uuid primary key default gen_random_uuid(),
  from_rental_days_count smallint not null,
  to_rental_days_count smallint not null,
  discount smallint not null
);

create table tariffs (
  id uuid primary key default gen_random_uuid(),
  price numeric(12,2) not null,
  distance int not null
);

create table rentals (
  id uuid primary key default gen_random_uuid(),
  days_count smallint not null,
  total_price numeric(12,2) not null,
  started_at date not null,
  ended_at date not null,
  car_id uuid not null,
  tariff_id uuid not null,
  discount_id uuid,
  foreign key (car_id) references cars (id),
  foreign key (tariff_id) references tariffs (id),
  foreign key (discount_id) references discounts (id)
);

create table migrations (
  execute boolean not null
);

insert into cars (brand, model, license_plate, vin_number) values
  ('Mercedes-Benz', 'W213', 'e213mb77', 'WDD2130501A293238'),
  ('Mercedes-Benz', 'W212', 'e212mb77', 'WDDHF5KB1EA839174'),
  ('Mercedes-Benz', 'W211', 'e211mb77', 'WDBUH82J84X162825'),
  ('Mercedes-Benz', 'W210', 'e210mb77', 'WDBJH65F6WA000000'),
  ('Mercedes-Benz', 'W124', 'e124mb77', 'WDB1240232B189324');

insert into tariffs (price, distance) values (270, 200), (330, 350), (390, 500);

insert into discounts (from_rental_days_count, to_rental_days_count, discount) values (3, 5, 5), (6, 14, 10), (15, 30, 15);

insert into migrations (execute) values (true);
