// global config
Window.App = {
    // elasticsearch host @mpkocher setup at PacBio.
    'host': 'http://login14-biofx01:9200/'
}
// extend this for specific indexes. e.g.
//const host = "http://localhost:9200/lims_subreadset_v2/lims_subreadset_v2/"

// pretty-print formatter for dates. derived from https://gist.github.com/akb/1187817
Window.App.formatDate = (val) => {

    return (function () {
        return ['Jan.', 'Feb.', 'Mar.',
                'Apr.', 'May', 'Jun.',
                'Jul.', 'Aug.', 'Sep.',
                'Oct.', 'Nov.', 'Dec.'][this.getMonth()] + " " +
            (function (d) {
                var s = d.toString(), l = s[s.length-1];
                return s+(['st','nd','rd'][l-1] || 'th');
            })(this.getDate()) + ", " +
            this.getFullYear() + " " +
            this.getHours() + ":" + ("0" + this.getMinutes()).slice(-2);
    }).call(new Date(val))
}