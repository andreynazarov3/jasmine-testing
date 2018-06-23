/* global $, allFeeds, loadFeed */

$(function () {

    describe("RSS Feeds", function () {

        it("are defined", function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it("all feeds have urls and urls are not empty", function () {
            allFeeds.forEach(element => {
                expect(element.url).toBeDefined();
                expect(element.url).not.toBeNull();
                expect(element.url).not.toBe("");
            });
        });


        it("all feeds have names and names are not empty", function () {
            allFeeds.forEach(element => {
                expect(element.name).toBeDefined();
                expect(element.name).not.toBeNull();
                expect(element.name).not.toBe("");
            });
        });
    });

    describe("The menu", () => {
        let menuIcon = $(".menu-icon-link");

        it("body has class 'menu-hidden' by default", function () {
            expect($("body").hasClass("menu-hidden")).toBeTruthy();
        });


        it("menu opens and closes by click on menu icon", function () {
            menuIcon.trigger("click");
            expect($("body").hasClass("menu-hidden")).not.toBeTruthy();
            menuIcon.trigger("click");
            expect($("body").hasClass("menu-hidden")).toBeTruthy();

        });
    });

    describe("Initial Entries", () => {
        beforeEach((done) => {
            loadFeed(0, done);
        });

        it("after initial page load feed container is not empty", (done) => {
            let articles = $(".feed .entry");
            expect(articles.size()).not.toBe(0);
            done();
        });
    });

    describe("New Feed Selection", () => {
        let oldArticles;
        let newArticles;
        
        // litle callback hell to make this test independent from Initial Entries test
        beforeEach((done) => {
            loadFeed(1, () => {
                oldArticles = $(".feed").html();
                loadFeed(0, () => {
                    newArticles = $(".feed").html();
                    done();
                });
            });
        });
        it("when new feed is loaded container content is changing", (done) => {            
            expect(oldArticles).not.toEqual(newArticles); 
            done();
        });
    });

}());