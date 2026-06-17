const UPGRADES = {
    copium: [
        { id: 0, name: "Doomscrolling", cost: 15, rate: 1, count: 0, description: "Twitter/X feeds" },
        { id: 1, name: "Reddit Arguments", cost: 100, rate: 8, count: 0, description: "Rage-bait engagement" },
        { id: 2, name: "Delusional Logic", cost: 500, rate: 25, count: 0, description: "Self-serving biases" },
        { id: 3, name: "Pure Denial", cost: 2500, rate: 100, count: 0, description: "Ignoring all facts" },
        { id: 4, name: "Brain Rot", cost: 10000, rate: 500, count: 0, description: "Total dissociation" },
        { id: 5, name: "Echo Chambers", cost: 50000, rate: 2000, count: 0, description: "Surround yourself with agreement" },
        { id: 6, name: "Selective Memory", cost: 250000, rate: 8000, count: 0, description: "Choosing what to remember" },
        { id: 7, name: "Gaslighting", cost: 1000000, rate: 25000, count: 0, description: "Making others doubt reality" },
        { id: 8, name: "Confirmation Bias", cost: 5000000, rate: 75000, count: 0, description: "Only seeing what you want" },
        { id: 9, name: "Reality Refusal", cost: 25000000, rate: 200000, count: 0, description: "The ultimate wall of denial" },
        { id: 10, name: "Transcendent Delusion", cost: 100000000, rate: 750000, count: 0, description: "Existing entirely in a dream" },
        { id: 11, name: "Ego Erasure", cost: 500000000, rate: 4000000, count: 0, description: "There is no longer a 'you' left to perceive the truth" }
    ],
    manual: [
        { id: 12, name: "Deep Breathing", cost: 30, rate: 2, count: 0, description: "Controlled inhalation technique" },
        { id: 13, name: "Meditation", cost: 200, rate: 6, count: 0, description: "Mindful absorption" },
        { id: 14, name: "Mindfulness", cost: 1000, rate: 20, count: 0, description: "Present moment awareness" },
        { id: 15, name: "Zen State", cost: 5000, rate: 75, count: 0, description: "Calm, focused inhalation" },
        { id: 16, name: "Trance", cost: 20000, rate: 250, count: 0, description: "Altered consciousness breathing" },
        { id: 17, name: "Satori", cost: 100000, rate: 1000, count: 0, description: "Moment of enlightenment" },
        { id: 18, name: "Hyperventilation", cost: 500000, rate: 5000, count: 0, description: "Rapidly inducing panic" },
        { id: 19, name: "Hypnotic Induction", cost: 2000000, rate: 20000, count: 0, description: "Subconscious suggestion" },
        { id: 20, name: "Astral Projection", cost: 10000000, rate: 75000, count: 0, description: "Detaching from the physical plane" },
        { id: 21, name: "Void Breathing", cost: 50000000, rate: 300000, count: 0, description: "Inhaling the absolute nothingness" },
        { id: 22, name: "Singularity Breath", cost: 200000000, rate: 1250000, count: 0, description: "Merging with the cosmic delusion" },
        { id: 23, name: "The Final Exhale", cost: 1000000000, rate: 5000000, count: 0, description: "Releasing the last breath of your former existence" }
    ],
    multiplier: {
        denial: [
            { id: 24, name: "Cognitive Dissonance", cost: 1000000000, rate: 0.1, purchased: false, description: "Increase denial gain by 10%" },
            { id: 25, name: "Emotional Detachment", cost: 5000000000, rate: 0.2, purchased: false, description: "Increase denial gain by 20%" },
            { id: 26, name: "Psychological Immunity", cost: 20000000000, rate: 0.3, purchased: false, description: "Increase denial gain by 30%" },
            { id: 27, name: "Mental Fortification", cost: 100000000000, rate: 0.5, purchased: false, description: "Increase denial gain by 50%" },
            { id: 28, name: "Neural Isolation", cost: 500000000000, rate: 1, purchased: false, description: "Increase denial gain by 100%" },
            { id: 29, name: "Cosmic Disconnection", cost: 1000000000000, rate: 2, purchased: false, description: "Increase denial gain by 200%" }
        ],
        inhale: [
            { id: 30, name: "Respiratory Mastery", cost: 5000000000, rate: 0.1, purchased: false, description: "Improves inhalation by 10%" },
            { id: 31, name: "Breath Control", cost: 20000000000, rate: 0.2, purchased: false, description: "Improves inhalation by 20%" },
            { id: 32, name: "Pranayama", cost: 100000000000, rate: 0.3, purchased: false, description: "Improves inhalation by 30%" },
            { id: 33, name: "Zen Breathing", cost: 500000000000, rate: 0.5, purchased: false, description: "Improves inhalation by 50%" },
            { id: 34, name: "Astral Inhalation", cost: 1000000000000, rate: 1, purchased: false, description: "Improves inhalation by 100%" },
            { id: 35, name: "Quantum Respiration", cost: 5000000000000, rate: 2, purchased: false, description: "Improves inhalation by 200%" }
        ]
    }
};

const DELUSION_STAGES = [
    { name: "Unknown", description: "Unknown state of denial" },
    { name: "Denial", description: "I don't know what's happening" },
    { name: "Confusion", description: "Things seem weird but I can't explain why" },
    { name: "Disbelief", description: "I'm not sure if this is real or not" },
    { name: "Rationalization", description: "I understand it, but I don't want to believe it" },
    { name: "Justification", description: "I know it's wrong, but I have good reasons for believing otherwise" },
    { name: "Acceptance", description: "I'm aware of the situation but choose to ignore it" },
    { name: "Rejection", description: "I reject all evidence against my beliefs" },
    { name: "Projection", description: "I blame others for the problems I'm facing" },
    { name: "Distortion", description: "I distort facts to fit my worldview" },
    { name: "Fabrication", description: "I create false narratives to support my beliefs" },
    { name: "Delusion", description: "I live in a completely fabricated reality" },
    { name: "Ontological Collapse", description: "Reality and delusion are one - I exist in both simultaneously" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UPGRADES, DELUSION_STAGES };
}
