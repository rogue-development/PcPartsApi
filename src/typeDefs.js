import { gql } from "apollo-server-core";

export const typeDefs = gql`
    type Query {
        cpu(CPU:searchCPU): [CPU]
    }

    type Mutation {
        addCPU(CPU:addCPU!): CPU!
        register(user: Register): User
        login(user: Login): Boolean!
    }

    # =================
    # Custom scalars
    # =================

    scalar Date

    # =================
    # CPU
    # =================

    enum CPUBrands {
        AMD
        INTEL
    }

    input searchCPU {
        brand: CPUBrands
        model: String
        baseClock: Float
        boostClock: Float
        socket: String
        cores: Int
        threads: Int
        hyperthreading: Boolean
        TDP: Int
        process: String
        hasiGPU: Boolean
        iGPU: inputGPU
        l1Cache: String
        l2Cache: String
        l3Cache: String
    }

    input addCPU {
        brand: CPUBrands!
        model: String!
        baseClock: Float!
        boostClock: Float!
        socket: String!
        cores: Int!
        threads: Int!
        hyperthreading: Boolean!
        TDP: Int
        process: String
        hasiGPU: Boolean
        iGPU: inputGPU
        l1Cache: String
        l2Cache: String
        l3Cache: String
    }

    type CPU {
        brand: CPUBrands!
        model: String!
        baseClock: Float!
        boostClock: Float!
        socket: String!
        cores: Int!
        threads: Int!
        hyperthreading: Boolean!
        TDP: Int
        process: String
        hasiGPU: Boolean
        iGPU: GPU
        l1Cache: String
        l2Cache: String
        l3Cache: String
    }

    # ================
    # GPU
    # ================

    input inputGPU {
        brand: CPUBrands
        model: String
        baseClock: Float
        boostClock: Float
        socket: String
        cores: Int
        threads: Int
        hyperthreading: Boolean
        TDP: Int
        process: String
    }

    type GPU {
        brand: CPUBrands
        model: String
        baseClock: Float
        boostClock: Float
        socket: String
        cores: Int
        threads: Int
        hyperthreading: Boolean
        TDP: Int
        process: String
    }

    # =================
    # User
    # =================

    input Register {
        email: String!,
        username: String!,
        password: String!,
        repeat_password: String!
    }

    input Login {
        email: String!
        password: String!
    }

    type User {
        email: String!
        username: String!
        avatar: String!
        last_login_date: Date
        roles: [String]!
    }
`