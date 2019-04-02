function hereToLeafletPolygon(poly) {
    let result = [];
    for (let coordinate of poly) {
       result.push(coordinate.split(","));
    }
    return result;
}

describe("Isoline Test", function() {

    it("works", function() {
        let input = [
            "1.1,2.2",
            "3.3,4.4"
        ];

        let expected = [
            ["1.1", "2.2"],
            ["3.3", "4.4"]
        ];

        let actual = hereToLeafletPolygon(input);
        chai.assert.deepEqual(actual, expected);
    });

    it("works with empty arrays", function() {
        let input = [];
        let expected = [];

        let actual = hereToLeafletPolygon(input);
        chai.assert.deepEqual(actual, expected);
    });

});
