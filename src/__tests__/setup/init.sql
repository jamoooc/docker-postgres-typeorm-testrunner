-- create a testing user role
CREATE USER tester WITH PASSWORD 'tester';

-- not really necessary but lets revoke access to the maintainence databases
DO
$$
DECLARE
    row record;
BEGIN
    FOR row IN SELECT datname FROM pg_database
    LOOP
        EXECUTE 'REVOKE CONNECT ON DATABASE ' || quote_ident(row.datname) || ' FROM tester;';
        -- revoke public role access as this is inherited by tester
        EXECUTE 'REVOKE CONNECT ON DATABASE ' || quote_ident(row.datname) || ' FROM public;';
    END LOOP;
END;
$$;

-- create testing database
CREATE DATABASE testing_db;

-- grant permissions to tester role
GRANT CONNECT ON DATABASE testing_db TO tester;
GRANT ALL PRIVILEGES ON DATABASE testing_db TO tester;
