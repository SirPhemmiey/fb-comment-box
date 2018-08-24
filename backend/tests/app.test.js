const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;
chai.use(chaiHttp);

describe("Fb Comments API", () => {
    describe("GET /comments", () => {
        it("should return an array of comments", (done) => {
            chai
            .request(app)
            .get('/comments')
            end((err, res) => {
                expect(Array.isArray(res.body.comments))
                .to
                .be
                .equal(true);
                done();
            });
        });
    });

    describe("POST /comments", () => {
        it("should post a comment", (done) => {
            chai
            .request(app)
            .post('/comments')
            .send({
                author: 'Omo Akinde',
                text: 'That is my name'
            })
            .end((err, res) => {
                expect(res)
                .to
                .have
                .status(200);
                done();
            })
        });
    })

    describe("DELETE comment", () => {
        it("should delete comment", (done) => {
            chai
            .request(app)
            .del('/comments/5b7cefd42a68bf814423d04b')
            .end((err, res) => {
                expect(res)
                .to
                .have
                .status(200);
                done();
            });
        });
    });
});