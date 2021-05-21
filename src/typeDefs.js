import { gql } from "apollo-server-core";

export const typeDefs = gql`
    type Query {
        # PC Parts
        cpu(CPU:searchCPU): [CPU]!
        gpu(GPU:searchGPU): [GPU]!
        psu(PSU:searchPSU): [PSU]!
        ram(RAM:searchRAM): [RAM]!
        ssd(SSD:searchSSD): [SSD]!
        hdd(HDD:searchHDD): [HDD]!

        allCPU: [CPU]!
        allGPU: [GPU]!
        allPSU: [PSU]!
        allRAM: [RAM]!
        allSSD: [SSD]!
        allHDD: [HDD]!
    }

    type Mutation {
        # Authentication
        register(user: Register): RegisterInfo!
        login(user: Login): AuthToken!
        requestNewVerificationEmail(token: String!): verificationResult!

        # PC Parts
        addCPU(CPU:inputCPU!): CPU!
        addGPU(GPU:inputGPU!): GPU!
        addPSU(PSU:inputPSU!): PSU!
        addRAM(RAM:inputRAM!): RAM!
        addSSD(SSD:inputSSD!): SSD!
        addHDD(HDD:inputHDD!): HDD!
    }

    # =================
    # Custom scalars
    # =================

    scalar Date
    scalar AuthToken

    # =================
    # Authentication
    # =================

    type RegisterInfo {
        user: User!
        authToken: AuthToken!
    }

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

    type verificationResult {
        sent: Boolean!
        message: String!
    }

    # =================
    # User
    # =================

    type User {
        email: String!
        username: String!
        avatar: String
        last_login_date: Date
        roles: [String]!
    }

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
        base_clock: Float
        boost_clock: Float
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

    input inputCPU {
        brand: CPUBrands!
        model: String!
        base_clock: Float!
        boost_clock: Float!
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
        base_clock: Float!
        boost_clock: Float!
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

    enum GPUBrands {
        AMD
        NVIDIA
        INTEL
    }

    input searchGPU {
        chip_brand: GPUBrands!
        manufacturer_brand: String!
        model: String
        series: String
        vram: String
        memory_type: String
        memory_speed: String
        memory_bandwith: String
        clock_speed: Float
        clock_speed_max: Float
        cores: Int
        card_interface: String
        video_out: String
        hdmi_ver: String
        dp_ver: String
        pci_slots: Int
        length: Float
        width: Float
        height: Float
        size_unit: String
        power_connector: String
        power_usage: Int
        cooling_type: String
        fan_count: Int
        led: Boolean
        led_color: String
        max_res: String
        directx_ver: String
        opengl_ver: String
    }

    input inputGPU {
        chip_brand: GPUBrands!
        manufacturer_brand: String!
        model: String!
        series: String!
        vram: String!
        memory_type: String
        memory_speed: String
        memory_bandwith: String
        clock_speed: Float!
        clock_speed_max: Float!
        cores: Int!
        card_interface: String!
        video_out: String
        hdmi_ver: String
        dp_ver: String
        pci_slots: Int!
        length: Float
        width: Float
        height: Float
        size_unit: String
        power_connector: String
        power_usage: Int!
        cooling_type: String
        fan_count: Int
        led: Boolean
        led_color: String
        max_res: String
        directx_ver: String
        opengl_ver: String
    }

    type GPU {
        chip_brand: GPUBrands!
        manufacturer_brand: String!
        model: String!
        series: String!
        vram: String!
        memory_type: String
        memory_speed: String
        memory_bandwith: String
        clock_speed: Float!
        clock_speed_max: Float!
        cores: Int!
        card_interface: String!
        video_out: String
        hdmi_ver: String
        dp_ver: String
        pci_slots: Int!
        length: Float
        width: Float
        height: Float
        size_unit: String
        power_connector: String
        power_usage: Int!
        cooling_type: String
        fan_count: Int
        led: Boolean
        led_color: String
        max_res: String
        directx_ver: String
        opengl_ver: String
    }

    # ================
    # PSU
    # ================

    input searchPSU {
        brand: String
        model: String
        wattage: Int
        rating: String
        continuous_or_estimated: String
        rail_12v: String
        rail_12v_capacity: String
        eu_certified: Boolean
        connections_sata: Int
        connections_molex: Int
        connections_pcie: Int
        connections_pcie_type: String
        connections_cpu: Int
        connections_cpu_type: String
        connections_dual_8pin: Boolean
        connections_modular: Boolean
        cooling_fans: Int
        cooling_fan_diameter: Int
        cooling_fan_diameter_unit: String
        cooling_type: String
        protections: [String]
        time_between_failures: Int
        time_between_failures_unit: String
        height: Int
        width: Int
        lenght: Int
        size_unit: String
        color: String
        unique_features: [String]
    }

    input inputPSU {
        brand: String!
        model: String!
        wattage: Int!
        rating: String
        continuous_or_estimated: String
        rail_12v: String
        rail_12v_capacity: String
        eu_certified: Boolean
        connections_sata: Int!
        connections_molex: Int!
        connections_pcie: Int!
        connections_pcie_type: String!
        connections_cpu: Int!
        connections_cpu_type: String!
        connections_dual_8pin: Boolean!
        connections_modular: Boolean!
        cooling_fans: Int
        cooling_fan_diameter: Int
        cooling_fan_diameter_unit: String
        cooling_type: String
        protections: [String!]
        time_between_failures: Int
        time_between_failures_unit: String
        height: Int
        width: Int
        lenght: Int
        size_unit: String
        color: String
        unique_features: [String!]
    }

    type PSU {
        brand: String!
        model: String!
        wattage: Int!
        rating: String
        continuous_or_estimated: String
        rail_12v: String
        rail_12v_capacity: String
        eu_certified: Boolean
        connections_sata: Int!
        connections_molex: Int!
        connections_pcie: Int!
        connections_pcie_type: String!
        connections_cpu: Int!
        connections_cpu_type: String!
        connections_dual_8pin: Boolean!
        connections_modular: Boolean!
        cooling_fans: Int
        cooling_fan_diameter: Int
        cooling_fan_diameter_unit: String
        cooling_type: String
        protections: [String]
        time_between_failures: Int
        time_between_failures_unit: String
        height: Int
        width: Int
        lenght: Int
        size_unit: String
        color: String
        unique_features: [String]
    }

    # ================
    # RAM
    # ================

    input searchRAM {
        brand: String,
        model: String,
        memory_capacity: Int,
        memory_capacity_unit: String,
        memory_modules: Int,
        memory_module_size: Int,
        memory_module_size_unit: String,
        memory_type: String,
        memory_speed: Int,
        memory_speed_unit: String,
        low_voltage_ddr: Boolean,
        cas_latency: Int,
        true_latency: Int,
        true_latency_unit: String,
        voltage: Float,
        led: Boolean,
        led_color: String,
        unique_features: [String]
    }

    input inputRAM {
        brand: String!,
        model: String!,
        memory_capacity: Int!,
        memory_capacity_unit: String!,
        memory_modules: Int!,
        memory_module_size: Int!,
        memory_module_size_unit: String!,
        memory_type: String!,
        memory_speed: Int!,
        memory_speed_unit: String!,
        low_voltage_ddr: Boolean,
        cas_latency: Int!,
        true_latency: Int,
        true_latency_unit: String,
        voltage: Float!,
        led: Boolean,
        led_color: String,
        unique_features: [String!]

    }

    type RAM {
        brand: String,
        model: String,
        memory_capacity: Int,
        memory_capacity_unit: String,
        memory_modules: Int,
        memory_module_size: Int,
        memory_module_size_unit: String,
        memory_type: String,
        memory_speed: Int,
        memory_speed_unit: String,
        low_voltage_ddr: Boolean,
        cas_latency: Int,
        true_latency: Int,
        true_latency_unit: String,
        voltage: Float,
        led: Boolean,
        led_color: String,
        unique_features: [String]
    }

    # ================
    # SSD
    # ================

    input searchSSD {
        brand: String,
        model: String,
        capacity: Int,
        capacity_unit: String,
        cache: Int,
        cache_unit: String,
        type: String,
        controller: String,
        properties: [String],
        interface: String,
        connector: String,
        power_usage_read: Int,
        power_usage_write: Int,
        power_usage_unit: String,
        time_between_failures: Int,
        time_between_failures_unit: String,
        max_guaranteed_bytes_writen: Int,
        max_guaranteed_bytes_writen_unit: String,
        drive_writes_per_day: Float,
        gb_per_day: Float,
        format: String,
        height: Float,
        height_unit: String,
        read_speed_sequential: Int,
        write_speed_sequential: Int,
        speed_sequential_unit: String,
        read_spead_random: Int,
        write_speed_random: Int,
        speed_random_unit: String,
        unique_features: [String]
    }

    input inputSSD {
        brand: String!,
        model: String!,
        capacity: Int!,
        capacity_unit: String!,
        cache: Int!,
        cache_unit: String!,
        type: String!,
        controller: String,
        properties: [String!],
        interface: String,
        connector: String,
        power_usage_read: Int,
        power_usage_write: Int,
        power_usage_unit: String,
        time_between_failures: Int,
        time_between_failures_unit: String,
        max_guaranteed_bytes_writen: Int,
        max_guaranteed_bytes_writen_unit: String,
        drive_writes_per_day: Float,
        gb_per_day: Float,
        format: String,
        height: Float,
        height_unit: String,
        read_speed_sequential: Int,
        write_speed_sequential: Int,
        speed_sequential_unit: String,
        read_spead_random: Int,
        write_speed_random: Int,
        speed_random_unit: String,
        unique_features: [String!]
    }

    type SSD {
        brand: String!,
        model: String!,
        capacity: Int!,
        capacity_unit: String!,
        cache: Int!,
        cache_unit: String!,
        type: String!,
        controller: String,
        properties: [String!],
        interface: String,
        connector: String,
        power_usage_read: Int,
        power_usage_write: Int,
        power_usage_unit: String,
        time_between_failures: Int,
        time_between_failures_unit: String,
        max_guaranteed_bytes_writen: Int,
        max_guaranteed_bytes_writen_unit: String,
        drive_writes_per_day: Float,
        gb_per_day: Float,
        format: String,
        height: Float,
        height_unit: String,
        read_speed_sequential: Int,
        write_speed_sequential: Int,
        speed_sequential_unit: String,
        read_spead_random: Int,
        write_speed_random: Int,
        speed_random_unit: String,
        unique_features: [String!]
    }

    # ================
    # HDD
    # ================

    input searchHDD {
        brand: String,
        model: String,
        capacity: Int,
        capacity_unit: String,
        interface: String,
        harddrive_bay: Float,
        harddrive_bay_unit: String,
        height: Float,
        size_unit: String,
        read_speed_sequential: Int,
        write_speed_sequential: Int,
        speed_sequential_unit: String,
        rotation_speed: Int,
        cache: Int,
        cache_unit: String,
        properties: [String!],
        power_usage_read: Float,
        power_usage_write: Float,
        power_usage_idle: Float,
        power_usage_unit: String,
        unique_features: [String!]
    }

    input inputHDD {
        brand: String!,
        model: String!,
        capacity: Int!,
        capacity_unit: String!,
        interface: String!,
        harddrive_bay: Float!,
        harddrive_bay_unit: String!,
        height: Float,
        size_unit: String,
        read_speed_sequential: Int!,
        write_speed_sequential: Int!,
        speed_sequential_unit: String!,
        rotation_speed: Int!,
        cache: Int,
        cache_unit: String,
        properties: [String!],
        power_usage_read: Float,
        power_usage_write: Float,
        power_usage_idle: Float,
        power_usage_unit: String,
        unique_features: [String!]
    }

    type HDD {
        brand: String!,
        model: String!,
        capacity: Int!,
        capacity_unit: String!,
        interface: String!,
        harddrive_bay: Float!,
        harddrive_bay_unit: String!,
        height: Float,
        size_unit: String,
        read_speed_sequential: Int!,
        write_speed_sequential: Int!,
        speed_sequential_unit: String!,
        rotation_speed: Int!,
        cache: Int,
        cache_unit: String,
        properties: [String!],
        power_usage_read: Float,
        power_usage_write: Float,
        power_usage_idle: Float,
        power_usage_unit: String,
        unique_features: [String!]
    }
`