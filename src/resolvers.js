import { AuthenticationError } from "apollo-server-errors";
import { GraphQLScalarType, Kind } from "graphql";
import { CPU } from "./models/PCParts/CPU";
import { GPU } from './models/PCParts/GPU';
import { PSU } from './models/PCParts/PSU';
import { RAM } from './models/PCParts/RAM';
import { SSD } from './models/PCParts/SSD';
import { HDD } from './models/PCParts/HDD';
import { User } from "./models/Users/User";
import { async } from "regenerator-runtime";

export const resolvers = {
    Date: new GraphQLScalarType({
        name: "Date",
        description: "Date custom scalar type",
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.getTime();
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return new Date(ast.value);
            }
            return null;
        }
    }),
    AuthToken: new GraphQLScalarType({
        name: "AuthToken",
        description: "Authentication token in JWT format",
        parseValue(value) {
            return String(value);
        },
        serialize(value) {
            return String(value);
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                return String(ast);
            }
            return null;
        }
    }),
    Query: {
        cpu: async (_, cpu, context) => await CPU.searchCPU(cpu.CPU),
        gpu: async (_, gpu, context) => await GPU.searchGPU(gpu.GPU),
        psu: async (_, psu, context) => await PSU.searchPSU(psu.PSU),
        ram: async (_, ram, context) => await RAM.searchRAM(ram.RAM),
        ssd: async (_, ssd, context) => await SSD.searchSSD(ssd.SSD),
        hdd: async (_, hdd, context) => await HDD.searchHDD(hdd.HDD),

        allCPU: async (_, _input, _context) => await CPU.getAll(),
        allGPU: async (_, _input, _context) => await GPU.getAll(),
        allPSU: async (_, _input, _context) => await PSU.getAll(),
        allRAM: async (_, _input, _context) => await RAM.getAll(),
        allSSD: async (_, _input, _context) => await SSD.getAll(),
        allHDD: async (_, _input, _context) => await HDD.getAll(),
    },
    Mutation: {
        addCPU: async (_, cpu, context) => {
            if (!await context.user || !(await context.user).roles.includes("verified")) throw new AuthenticationError('you must be logged in / or you don\'t the right privileges');
            return CPU.addCPU(cpu.CPU)
        },
        addGPU: async (_, gpu, context) => {
            if (!await context.user || !(await context.user).roles.includes("verified")) throw new AuthenticationError('you must be logged in / or you don\'t the right privileges');
            return GPU.addGPU(gpu.GPU)
        },
        addPSU: async (_, psu, context) => {
            if (!await context.user || !(await context.user).roles.includes("verified")) throw new AuthenticationError('you must be logged in / or you don\'t the right privileges');
            return PSU.addPSU(psu.PSU)
        },
        addRAM: async (_, ram, context) => {
            if (!await context.user || !(await context.user).roles.includes("verified")) throw new AuthenticationError('you must be logged in / or you don\'t the right privileges');
            return RAM.addRAM(ram.RAM)
        },
        addSSD: async (_, ssd, context) => {
            if (!await context.user || !(await context.user).roles.includes("verified")) throw new AuthenticationError('you must be logged in / or you don\'t the right privileges');
            return SSD.addSSD(ssd.SSD)
        },
        addHDD: async (_, hhd, context) => {
            if (!await context.user || !(await context.user).roles.includes("verified")) throw new AuthenticationError('you must be logged in / or you don\'t the right privileges');
            return HDD.addHDD(hhd.HDD)
        },
        register: async (_, { user }, context) => {
            return await User.register(user, context.ip);
        },
        login: async (_, { user }, context) => {
            return await User.login(user, context.ip)
        }
    }
}