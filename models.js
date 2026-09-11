const mongoose = require('mongoose');

const { Schema } = mongoose;
const ref = (name) => ({ type: Schema.Types.ObjectId, ref: name });
const User = mongoose.model('User', new Schema({
  name: { type: String, required: true }, email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }, role: { type: String, enum: ['Student', 'College', 'Industry', 'Admin'], required: true }
}, { timestamps: true }));
const StudentProfile = mongoose.model('StudentProfile', new Schema({ user: ref('User'), college: String, qualification: String, stream: String, skills: [String], skillScore: { type: Number, default: 0 }, bio: String }));
const College = mongoose.model('College', new Schema({ name: String, location: String, website: String, studentCount: Number }));
const Company = mongoose.model('Company', new Schema({ user: ref('User'), name: String, industry: String, location: String, about: String, verified: Boolean }));
const Skill = mongoose.model('Skill', new Schema({ name: { type: String, unique: true }, category: String, demandScore: Number }));
const Assessment = mongoose.model('Assessment', new Schema({ title: String, skill: ref('Skill'), questions: [{ prompt: String, options: [String], answer: String }], durationMinutes: Number }));
const Course = mongoose.model('Course', new Schema({ title: String, provider: String, skills: [String], level: String, url: String }));
const Internship = mongoose.model('Internship', new Schema({ company: ref('Company'), title: String, location: String, stipend: String, requiredSkills: [String], status: String }));
const Job = mongoose.model('Job', new Schema({ company: ref('Company'), title: String, location: String, salary: String, requiredSkills: [String], status: String }));
const Application = mongoose.model('Application', new Schema({ student: ref('StudentProfile'), opportunityType: String, opportunity: Schema.Types.ObjectId, status: String, matchScore: Number }, { timestamps: true }));
const Recommendation = mongoose.model('Recommendation', new Schema({ student: ref('StudentProfile'), type: String, title: String, reason: String, matchScore: Number }));
const Portfolio = mongoose.model('Portfolio', new Schema({ student: ref('StudentProfile'), headline: String, about: String, projects: [{ title: String, description: String, url: String }], links: [String] }));

module.exports = { User, StudentProfile, College, Company, Skill, Assessment, Course, Internship, Job, Application, Recommendation, Portfolio };
