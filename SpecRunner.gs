var ss_;

/**
 * Runs all specs
 *
 * @param {object} specs Specs object like { spec1: function() {...}, spec2: function() {...}, ... }
 * @param {Spreadsheet} spreadsheet Spreadsheet containing fixture sheets.<br>
 *                                  If not given, SpreadsheetApp.getActive() is used.
 */
function runAll(specs, spreadsheet) {
  ss_ = (spreadsheet || SpreadsheetApp.getActive());
  for (var f in specs) {
    specs[f]();
  }
}

/**
 * Copies fixture sheet and gets rollback on the end of the spec
 *
 * @param {String}   sourceSheetName The fixture sheet name
 * @param {function} specFunc        Spec body
 */
function withCopiedSheet(sourceSheetName, specFunc) {
  var source = ss_.getSheetByName(sourceSheetName);
  var copied = source.copyTo(ss_);
  source.setName(sourceSheetName + '_BackUpBySpecRunner');
  copied.setName(sourceSheetName);
  try {
    specFunc(copied);
  } finally {
    ss_.deleteSheet(copied);
    source.setName(sourceSheetName);
  }
}