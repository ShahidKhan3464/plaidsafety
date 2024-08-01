export const riskRankingData = {
    likelihoods: [
        { label: 'Rare' },
        { label: 'Unlikely' },
        { label: 'Possible' },
        { label: 'Likely' },
        { label: 'Almost Certain' }
    ],
    severities: [
        { label: '1 (A)' },
        { label: '2 (B)' },
        { label: '3 (C)' },
        { label: '4 (D)' },
        { label: '5 (E)' }
    ]
};

export const shift = [
    { value: '1st', text: '1st' },
    { value: '2nd', text: '2nd' },
    { value: '3rd', text: '3rd' },
];

export const site = [
    { value: 'SFS', text: 'SFS' },
    { value: 'LAX', text: 'LAX' },
    { value: 'LGB', text: 'LGB' },
];

export const priority = [
    { value: 'high', text: 'High' },
    { value: 'medium', text: 'Medium' },
    { value: 'low', text: 'Low' }
];

export const hazardPresent = [
    { value: 'yes', text: 'Yes' },
    { value: 'no', text: 'No' }
];

export const riskRanking = [
    { value: 'low', text: 'Low (1-4)' },
    { value: 'medium', text: 'Medium (5-11)' },
    { value: 'high', text: 'High (12-25)' }
];

export const currentHierarchyControls = [
    {
        value: 'PPE (personal protective equipment)',
        text: 'PPE (Personal protective equipment)'
    },
    { value: 'administrative control', text: 'Administrative Control' },
    { value: 'engineering administrative', text: 'Engineering Administrative' },
    { value: 'elimination', text: 'Elimination' },
    { value: 'substitution', text: 'Substitution' },
];

export const department = [
    { value: 'Warehourse', text: 'Warehouse' },
    { value: 'Operations', text: 'Operations' },
    { value: 'Production', text: 'Production' },
    { value: 'HR', text: 'HR' },
    { value: 'Safety', text: 'Safety' },
    { value: 'Engineering', text: 'Engineering' },
    { value: 'Maintenance', text: 'Maintenance' },
    { value: 'Cooler', text: 'Cooler' }
];

export const category = [
    { value: 'air quality', text: 'Air Quality' },
    { value: 'audit', text: 'Audit' },
    { value: 'CAL-OSHA', text: 'CAL-OSHA' },
    { value: 'corrective action', text: 'Corrective Action' },
    { value: 'CUPA / CERS', text: 'CUPA / CERS' },
    { value: 'environmental', text: 'Environmental' },
    { value: 'EPA ID', text: 'EPA ID' },
    { value: 'EPCRA', text: 'EPCRA' },
    { value: 'fire prevention', text: 'Fire Prevention' },
    { value: 'DTSC-hazardous waste', text: 'DTSC-Hazardous Waste' },
    { value: 'health and safety', text: 'Health and Safety' },
    { value: 'industrial hygiene', text: 'Industrial Hygiene' },
    { value: 'incident action', text: 'Incident Action' },
    { value: 'investigation', text: 'Investigation' },
    { value: 'inspection', text: 'Inspection' },
    { value: 'OSHA', text: 'OSHA' },
    { value: 'permit', text: 'Permit' },
    { value: 'process safety managements', text: 'Process Safety Managements' },
    { value: 'prop 65', text: 'Prop 65' },
    { value: 'review', text: 'Review' },
    { value: 'SPCC', text: 'SPCC' },
    { value: 'stormwater - NPDES', text: 'Stormwater - NPDES' },
    { value: 'TSCA, Toxic', text: 'TSCA, Toxic' },
    { value: 'USEPA', text: 'USEPA' },
    { value: 'wastewater sanitation', text: 'Wastewater Sanitation' },
];

export const status = [
    { value: 'not started', text: 'Not Started' },
    { value: 'completed', text: 'Completed' },
    { value: 'delayed', text: 'Delayed' },
    { value: 'closed', text: 'Closed' },
    { value: 'in progress', text: 'In Progress' }
];

export const hazardType = [
    { value: 'caught-in hazards', text: 'Caught-in Hazards' },
    { value: 'chemical hazards', text: 'Chemical Hazards' },
    { value: 'electrical hazards', text: 'Electrical Hazards' },
    { value: 'ergonomic hazards', text: 'Ergonomic Hazards' },
    { value: 'falling objects', text: 'Falling Objects' },
    { value: 'smoke, fire', text: 'Smoke, Fire' },
    { value: 'housekeeping', text: 'Housekeeping' },
    { value: 'lifting and material handling', text: 'Lifting and Material Handling' },
    { value: 'lockout/tagout', text: 'Lockout/Tagout' },
    { value: 'maintenance related', text: 'Maintenance Related' },
    { value: 'forklifts, mobile equipment,PITS', text: 'Forklifts, Mobile Equipment,PITS' },
    { value: 'personal protective equipment', text: 'Personal Protective Equipment' },
    { value: 'repetitive motion', text: 'Repetitive Motion' },
    { value: 'respiratory hazards', text: 'Respiratory Hazards' },
    { value: 'slips, trips, and fall', text: 'Slips, Trips, and Fall' },
    { value: 'struck-by hazards', text: 'Struck-by Hazards' },
    { value: 'walking surfaces (uneven, wet, slippery)', text: 'Walking Surfaces (Uneven, Wet, Slippery)' },
    { value: 'weather related', text: 'Weather Related' },
    { value: 'other', text: 'Other' },
];

export const unsafeCondition = [
    { value: 'chemical hazards', text: 'Chemical Hazards' },
    { value: 'confined space hazards', text: 'Confined Space Hazards' },
    { value: 'electrical hazards', text: 'Electrical Hazards' },
    { value: 'equipment maintenance', text: 'Equipment Maintenance' },
    { value: 'ergonomic hazards', text: 'Ergonomic Hazards' },
    { value: 'falling objects', text: 'Falling Objects' },
    { value: 'high-traffic areas', text: 'High-Traffic Areas' },
    { value: 'inadequate machine guarding', text: 'Inadequate Machine Guarding' },
    { value: 'lack of safety signage or warnings', text: 'Lack of Safety Signage or Warnings' },
    { value: 'poor housekeeping', text: 'Poor Housekeeping' },
    { value: 'walkways and isles', text: 'Walkways and Isles' },
    { value: 'other', text: 'Other' },
];

export const unsafeAct = [
    { value: 'bypassing safety procedures', text: 'Bypassing Safety Procedures' },
    { value: 'distraction during critical tasks', text: 'Distraction During Critical Tasks' },
    { value: 'horseplay', text: 'Horseplay' },
    { value: 'housekeeping', text: 'Housekeeping' },
    { value: 'ignoring hazard warnings', text: 'Ignoring Hazard Warnings' },
    { value: 'improper lifting techniques', text: 'Improper Lifting Techniques' },
    { value: 'ladders / fall protection', text: 'Ladders / Fall Protection' },
    { value: 'lockout/tagout', text: 'Lockout/Tagout' },
    { value: 'personal protective equipment', text: 'Personal Protective Equipment' },
    { value: '(PPE)', text: '(PPE)' },
    { value: 'rushing / unsafe speeds', text: 'Rushing / Unsafe Speeds' },
    { value: 'unauthorized equipment use', text: 'Unauthorized Equipment Use' },
    { value: 'vehicles / PITS / pedestrian', text: 'Vehicles / PITS / Pedestrian' },
    { value: 'other', text: 'Other' },
];

export const industry = [
    {
        value: 'Accommodation and Food Service',
        text: 'Accommodation and Food Service'
    },
    {
        value: 'Administrative and Support, Waste Management and Remediation Services',
        text: 'Administrative and Support, Waste Management and Remediation Services'
    },
    {
        value: 'Agriculture, Forestry, Fishing and Hunting',
        text: 'Agriculture, Forestry, Fishing and Hunting'
    },
    {
        value: 'Arts, Entertainment and Recreation',
        text: 'Arts, Entertainment and Recreation'
    },
    { value: 'Construction', text: 'Construction' },
    { value: 'Education Services', text: 'Education Services' },
    { value: 'Finance and Insurance', text: 'Finance and Insurance' },
    { value: 'Health Care and Social Assistance', text: 'Health Care and Social Assistance' },
    { value: 'Information and Culture Industries', text: 'Information and Culture Industries' },
    {
        value: 'Management of Companies and Enterprises',
        text: 'Management of Companies and Enterprises'
    },
    { value: 'Manufacturing', text: 'Manufacturing' },
    {
        value: 'Mining, Quarrying, Oil and Gas Extraction',
        text: 'Mining, Quarrying, Oil and Gas Extraction'
    },
    {
        value: 'Other Services (Except Public Administration)',
        text: 'Other Services (Except Public Administration)'
    },
    {
        value: 'Professional, Scientific and Technical Services',
        text: 'Professional, Scientific and Technical Services'
    },
    {
        value: 'Public Administration',
        text: 'Public Administration'
    },
    {
        value: 'Real Estate and Rental and Leasing',
        text: 'Real Estate and Rental and Leasing'
    },
    {
        value: 'Retail Trade',
        text: 'Retail Trade'
    },
    {
        value: 'Transportation and Warehouse',
        text: 'Transportation and Warehouse'
    },
    {
        value: 'Utilities',
        text: 'Utilities'
    },
    {
        value: 'Wholesale Trade',
        text: 'Wholesale Trade'
    },
];

export const companySize = [
    { value: '1-5', text: '1-5' },
    { value: '5-25', text: '5-25' },
    { value: '25-50', text: '25-50' },
    { value: '50-100', text: '50-100' },
    { value: '100-500', text: '100-500' },
    { value: '500-1000', text: '500-1000' },
    { value: '1000+', text: '1000+' },
];

export const states = [
    { value: "Alabama", text: "Alabama" },
    { value: "Alaska", text: "Alaska" },
    { value: "Arizona", text: "Arizona" },
    { value: "Arkansas", text: "Arkansas" },
    { value: "American Samoa", text: "American Samoa" },
    { value: "California", text: "California" },
    { value: "Colorado", text: "Colorado" },
    { value: "Connecticut", text: "Connecticut" },
    { value: "Delaware", text: "Delaware" },
    { value: "District of Columbia", text: "District of Columbia" },
    { value: "Florida", text: "Florida" },
    { value: "Georgia", text: "Georgia" },
    { value: "Guam", text: "Guam" },
    { value: "Hawaii", text: "Hawaii" },
    { value: "Idaho", text: "Idaho" },
    { value: "Illinois", text: "Illinois" },
    { value: "Indiana", text: "Indiana" },
    { value: "Iowa", text: "Iowa" },
    { value: "Kansas", text: "Kansas" },
    { value: "Kentucky", text: "Kentucky" },
    { value: "Louisiana", text: "Louisiana" },
    { value: "Maine", text: "Maine" },
    { value: "Maryland", text: "Maryland" },
    { value: "Massachusetts", text: "Massachusetts" },
    { value: "Michigan", text: "Michigan" },
    { value: "Minnesota", text: "Minnesota" },
    { value: "Mississippi", text: "Mississippi" },
    { value: "Missouri", text: "Missouri" },
    { value: "Montana", text: "Montana" },
    { value: "Nebraska", text: "Nebraska" },
    { value: "Nevada", text: "Nevada" },
    { value: "New Hampshire", text: "New Hampshire" },
    { value: "New Jersey", text: "New Jersey" },
    { value: "New Mexico", text: "New Mexico" },
    { value: "New York", text: "New York" },
    { value: "North Carolina", text: "North Carolina" },
    { value: "North Dakota", text: "North Dakota" },
    { value: "Northern Mariana Islands", text: "Northern Mariana Islands" },
    { value: "Ohio", text: "Ohio" },
    { value: "Oklahoma", text: "Oklahoma" },
    { value: "Oregon", text: "Oregon" },
    { value: "Pennsylvania", text: "Pennsylvania" },
    { value: "Puerto Rico", text: "Puerto Rico" },
    { value: "Rhode Island", text: "Rhode Island" },
    { value: "South Carolina", text: "South Carolina" },
    { value: "South Dakota", text: "South Dakota" },
    { value: "Tennessee", text: "Tennessee" },
    { value: "Texas", text: "Texas" },
    { value: "Trust Territories", text: "Trust Territories" },
    { value: "Utah", text: "Utah" },
    { value: "Vermont", text: "Vermont" },
    { value: "Virgin Islands", text: "Virgin Islands" },
    { value: "Virginia", text: "Virginia" },
    { value: "Washington", text: "Washington" },
    { value: "West Virginia", text: "West Virginia" },
    { value: "Wisconsin", text: "Wisconsin" },
    { value: "Wyoming", text: "Wyoming" }
];