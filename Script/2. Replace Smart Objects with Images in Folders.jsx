/**
 * Script
 *
 * @file 2. Replace Smart Objects with Folders.jsx
 * @author naseem.amjad@gmail.com
 * @version 1.0.1
 * @date 10 October 2021
 * @update 22 March 2023
 */

/*

*/


#target "Photoshop"

#script 2. Replace Smart Objects with Folders
#script "2. Replace Smart Objects with Folders"

#strict on


var script_genRePlaceImages_2 = function () {
  cTID = function(s) { return cTID[s] || cTID[s] = app.charIDToTypeID(s); };
  sTID = function(s) { return sTID[s] || sTID[s] = app.stringIDToTypeID(s); };

  if(typeof JSON!=="object"){JSON={}}(function(){var rx_one=/^[\],:{}\s]*$/;var rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;var rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;var rx_four=/(?:^|:|,)(?:\s*\[)+/g;var rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;var rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;function f(n){return(n<10)?"0"+n:n}function this_value(){return this.valueOf()}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?(this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"):null};Boolean.prototype.toJSON=this_value;Number.prototype.toJSON=this_value;String.prototype.toJSON=this_value}var gap;var indent;var meta;var rep;function quote(string){rx_escapable.lastIndex=0;return rx_escapable.test(string)?'"'+string.replace(rx_escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i;var k;var v;var length;var mind=gap;var partial;var value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return(isFinite(value))?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?("[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]"):"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+((gap)?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+((gap)?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k;var v;var value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);rx_dangerous.lastIndex=0;if(rx_dangerous.test(text)){text=text.replace(rx_dangerous,function(a){return("\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4))})}if(rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,""))){j=eval("("+text+")");return(typeof reviver==="function")?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());

  String.prototype.trim2 = function() { return this.replace(/^\s+|\s+$/g, ''); };
  String.prototype.slashed = function() { return (this.charAt(this.length - 1) == '/' || this.charAt(this.length - 1) == '\\') ? this : this + '/'; };
  function indexOf(arr, obj) {
    var i, j;
    for (i = -1, j = arr.length; ++i < j; ) {
        if (arr[i] == obj) { return i; }
    }
    return -1;
  }


  /**
   *
   * getTLayersList(doc, LayerKind.TEXT);
   */
  function getTLayersList(obj, kind) {
    var lays = [];
    var i;
    for (i = 0; i < obj.layers.length; i++) {
      if (obj.layers[i].kind == kind) { lays.push(obj.layers[i]); }
    }
    for (i = 0; i < obj.layerSets.length; i++) {
      lays = lays.concat(getTLayersList(obj.layerSets[i], kind));
    }
    return lays;
  }

  function getLayersSmart(obj, lays) {
    var i;
    for (i = obj.layers.length - 1; i > -1; i--) {
      if (obj.layers[i].kind == LayerKind.SMARTOBJECT && !obj.layers[i].positionLocked) lays.push(obj.layers[i]);
    }
    for (i = obj.layerSets.length - 1; i > -1; i--) {
      getLayersSmart(obj.layerSets[i], lays);
    }
  }

  function getLayerByName(obj, name) {
    for (var i = obj.layers.length - 1; i > -1; i--) {
      if (obj.layers[i].name.toUpperCase() == name.toUpperCase()) return obj.layers[i];
    }
    for (var i = obj.layerSets.length - 1; i > -1; i--) {
      var res = getLayerByName(obj.layerSets[i], name);
      if (res !== null) return res;
    }
    return null;
  }

  function getLayersByName(obj, name, lays) {
    for (var i = obj.layers.length - 1; i > -1; i--) {
      if (obj.layers[i].name.toUpperCase() == name.toUpperCase()) lays.push(obj.layers[i]);
    }
    for (var i = obj.layerSets.length - 1; i > -1; i--) {
      getLayersByName(obj.layerSets[i], name, lays);
    }
  }

  /**

   */
  function textChangeAndFit2(layerRef, fmethod1, fcorrection1, sss, fontsize1, numretry, fcheckup) {
    var res = {};

    var bx = layerRef.bounds[0];
    var by = layerRef.bounds[1];
    var bwid = layerRef.bounds[2] - layerRef.bounds[0];
    var bhei = layerRef.bounds[3] - layerRef.bounds[1];

    if (fmethod1 && fontsize1 != "100") {
      layerRef.textItem.size = (layerRef.textItem.size * Number(fontsize1) / 100.0);
    }
    var contents = '' + layerRef.textItem.contents;
    layerRef.textItem.contents = (fcheckup && contents == contents.toUpperCase()) ? sss.toUpperCase() : sss;

    res.bwids = layerRef.bounds[2] - layerRef.bounds[0];
    res.bheis = layerRef.bounds[3] - layerRef.bounds[1];

  if (res.bwids > bwid) {
    for (; numretry > 0; numretry--) {
      var bwid2 = layerRef.bounds[2] - layerRef.bounds[0];
      var bhei2 = layerRef.bounds[3] - layerRef.bounds[1];

      if (fmethod1) {
        layerRef.resize(Number(bwid) / Number(bwid2) * 100, Number(bhei) / Number(bhei2) * 100, AnchorPosition.TOPLEFT); //AnchorPosition.MIDDLECENTER);

        // correction
        if (fcorrection1) {
          docRef.activeLayer = layerRef;
          correction1(Number(res.bwids) / Number(bwid2) * 100.0, Number(res.bheis) / Number(bhei2) * 100.0);
          bwid2 = layerRef.bounds[2] - layerRef.bounds[0];
          bhei2 = layerRef.bounds[3] - layerRef.bounds[1];
          //layerRef.translate(bx - layerRef.bounds[0] + (bwid - bwid2) * 0.5, by - layerRef.bounds[1] + (bhei - bhei2) * 0.5);
        }
      }
      else {
        app.activeDocument.activeLayer = layerRef;

        var desc500 = new ActionDescriptor();
        var ref95 = new ActionReference();
        ref95.putProperty( charIDToTypeID( "Prpr" ), charIDToTypeID( "TxtS" ) );
        ref95.putEnumerated( charIDToTypeID( "TxLr" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
        desc500.putReference( charIDToTypeID( "null" ), ref95 );
        var desc501 = new ActionDescriptor();
        desc501.putInteger( stringIDToTypeID( "textOverrideFeatureName" ), 808465463 );
        desc501.putInteger( stringIDToTypeID( "typeStyleOperationType" ), 3 );
        desc501.putDouble( charIDToTypeID( "HrzS" ), Number(bwid) / Number(bwid2) * 100 );
        desc500.putObject( charIDToTypeID( "T   " ), charIDToTypeID( "TxtS" ), desc501 );
        executeAction( charIDToTypeID( "setd" ), desc500, DialogModes.NO );
      }
    }
  }
    bwid2 = layerRef.bounds[2] - layerRef.bounds[0];
    bhei2 = layerRef.bounds[3] - layerRef.bounds[1];
    layerRef.translate(bx - layerRef.bounds[0] + (bwid - bwid2) * 0.5, by - layerRef.bounds[1] + (bhei - bhei2) * 0.5);
  }

  function replaceContentsFit(lay1, newFile) {
    app.activeDocument.activeLayer = lay1;

    var xx = lay1.bounds[0];
    var yy = lay1.bounds[1];
    var wid = Math.abs(lay1.bounds[2] - lay1.bounds[0]);
    var hei = Math.abs(lay1.bounds[3] - lay1.bounds[1]);

    // =======================================================
    var desc3 = new ActionDescriptor();
    desc3.putPath( charIDToTypeID( "null" ), new File( newFile ) );
    desc3.putInteger( charIDToTypeID( "PgNm" ), 1 );
    executeAction( stringIDToTypeID( "placedLayerReplaceContents" ), desc3, DialogModes.NO );

    var ww = Math.abs(lay1.bounds[2] - lay1.bounds[0]);
    var hh = Math.abs(lay1.bounds[3] - lay1.bounds[1]);
    var sclx = wid / ww;
    var scly = hei / hh;

    var scl = sclx < scly ? sclx : scly;
    lay1.resize(scl * 100, scl * 100, AnchorPosition.MIDDLECENTER);
    lay1.translate(xx - lay1.bounds[0] + (wid - ww * scl) * 0.5, yy - lay1.bounds[1] + (hei - hh * scl) * 0.5);
    //lay1.translate(xx - lay1.bounds[0], yy - lay1.bounds[1]);
  }


  function createNamedSnapshot(name, freplace) {
    try {
      var desc = new ActionDescriptor();
          var ref = new ActionReference();
          ref.putClass( charIDToTypeID('SnpS') );
      desc.putReference( charIDToTypeID('null'), ref );
          var ref1 = new ActionReference();
          ref1.putProperty( charIDToTypeID('HstS'), charIDToTypeID('CrnH') );
      desc.putReference( cTID('From'), ref1 );
      desc.putString( charIDToTypeID('Nm  '), name );
      desc.putEnumerated( charIDToTypeID('Usng'), charIDToTypeID('HstS'), charIDToTypeID('FllD') );
      if (!!freplace) desc.putBoolean( stringIDToTypeID( "replaceExisting" ), true );
      executeAction( charIDToTypeID('Mk  '), desc, DialogModes.NO );
    }
    catch (_) {
    }
  }
  function revertNamedSnapshot(name) {
    try {
      var desc = new ActionDescriptor();
          var ref = new ActionReference();
          ref.putName( charIDToTypeID('SnpS'), name );
      desc.putReference( charIDToTypeID('null'), ref );
      executeAction( charIDToTypeID('slct'), desc, DialogModes.NO );
    }
    catch (_) {
    }
  }
  function deleteNamedSnapshot(name) {
    try {
      var desc918 = new ActionDescriptor();
        var ref124 = new ActionReference();
        ref124.putName( charIDToTypeID( "SnpS" ), name );
      desc918.putReference( charIDToTypeID( "null" ), ref124 );
      executeAction( charIDToTypeID( "slct" ), desc918, DialogModes.NO );

      var desc919 = new ActionDescriptor();
        var ref125 = new ActionReference();
        ref125.putProperty( charIDToTypeID( "HstS" ), charIDToTypeID( "CrnH" ) );
      desc919.putReference( charIDToTypeID( "null" ), ref125 );
      executeAction( charIDToTypeID( "Dlt " ), desc919, DialogModes.NO );
    }
    catch (_) {
    }
  }
  function renameNamedSnapshot(name, name2) {
    try {
      var desc530 = new ActionDescriptor();
        var ref379 = new ActionReference();
        ref379.putName( charIDToTypeID( "SnpS" ), name );
      desc530.putReference( charIDToTypeID( "null" ), ref379 );
      executeAction( charIDToTypeID( "slct" ), desc530, DialogModes.NO );

      var desc531 = new ActionDescriptor();
        var ref380 = new ActionReference();
        ref380.putProperty( charIDToTypeID( "HstS" ), charIDToTypeID( "CrnH" ) );
      desc531.putReference( charIDToTypeID( "null" ), ref380 );
        var desc532 = new ActionDescriptor();
        desc532.putString( charIDToTypeID( "Nm  " ), name2 );
      desc531.putObject( charIDToTypeID( "T   " ), charIDToTypeID( "SnpS" ), desc532 );
      executeAction( charIDToTypeID( "setd" ), desc531, DialogModes.NO );
    }
    catch (_) {
    }
  }


  /**
   * read dat file
   * @param   {File} fcsv
   * @returns {Object|Boolean}
   */
  function readdat(fcsv, delim) {
    var res = {};
    var fop;
    try {
      //fcsv.encoding = 'UTF-8';
      fop = fcsv.open("r:");
      var sss;
      sss = fcsv.readln();
      if (sss.trim2() !== '') {
        //res.head = sss.split(delim);
        res.head = csvToArray(sss);
      }
      res.dat = [];
      var line = 0;
      for (; !fcsv.eof; ) {
        sss = fcsv.readln();
        if (sss.trim2() !== '') {
          //res.dat[line] = sss.split(delim);
          res.dat[line] = csvToArray(sss);
          line++;
        }
      }
    }
    catch (ex) {
     alert(ex);
    }
    finally {
      if (fop) fcsv.close();
    }
    return res;
  }

  function csvToArray(text) {
    var ret = [''], i = 0, p = '', s = true;
    for (var n = 0, l; n < text.length; n++) {
        l = text.charAt(n);
        if ('"' === l) {
            s = !s;
            if ('"' === p) {
                ret[i] += '"';
                l = '-';
            } else if ('' === p)
                l = '-';
        } else if (s && ',' === l)
            l = ret[++i] = '';
        else
            ret[i] += l;
        p = l;
    }
    return ret;
  }


  function makeLayerActiveByName(nm) {
    try {
      var desc5 = new ActionDescriptor();
          var ref4 = new ActionReference();
          ref4.putName( cTID('Lyr '),  nm);
      desc5.putReference( cTID('null'), ref4 );
      desc5.putBoolean( cTID('MkVs'), false );
      executeAction( cTID('slct'), desc5, DialogModes.NO );
      return true;

    } catch (e) {
      return false;
    }
  }

  function setText(lay, replaceWith) {
    lay.textItem.contents = replaceWith;
  }

  /**
   * read dats
   */
  function readDats(fcc, dats) {
    try {
        if (fcc.exists) {
            fcc.open("r:");
			var dats0 = JSON.parse(fcc.read());
            var key;
            for (key in dats) {
              if (dats0[key] !== undefined) {
                dats[key] = dats0[key];
              }
            }
        }
    }
    catch(e) {
    }
    finally {
        if (fcc !== null) fcc.close();
    }
  }

  /**
   * save dats
   */
  function saveDats(fcc, dats) {
    try {
        fcc.open("w:");
        fcc.write(dats = JSON.stringify(dats, undefined, 2));
    }
    catch(e) {
    }
    finally {
        if (fcc !== null) fcc.close();
    }
  }



  /**
   * dialog
   */
  function dlg_input(dats, title) {
    try {

      var offbase = psource;

      var w1 = new Window ("dialog",
             title,
             undefined, { maximizeButton: false, minimizeButton: false });
      w1.orientation = "column";

	  var tab1 = w1;


      w1.g = tab1.add("group");
      w1.g.orientation = "row";
      w1.g.alignment = ["fill", "top"];
      w1.g.alignChildren = ["left", "fill"];
      w1.g.add("statictext", undefined, "Source folder: ", "alignment:left");
      w1.path2 = w1.g.add("edittext", undefined, "??????????", { readonly: false });
      w1.path2.minimumSize.width = w1.path2.maximumSize.width = 430;
      w1.path2.text = dats.sourceFolder;
      w1.btn1 = w1.g.add("button", undefined, "...");
      w1.btn1.onClick = function() {
          var ex = new Folder(w1.path2.text);
          if (!ex.exists) ex = offbase;
          var off = Folder.selectDialog("Please choose Source folder", ex);
          if (off === null) {
            return;
          }
          else {
            offbase = off.parent;
            w1.path2.text = decodeURI(off.fsName);
          }
        };
      w1.btn1.maximumSize.width = 60;
      w1.btn1.alignment = ["right", "fill"];

      w1.g = tab1.add("group");
      w1.g.orientation = "row";
      w1.g.alignment = ["fill", "top"];
      w1.g.alignChildren = ["left", "fill"];
      w1.g.add("statictext", undefined, "IMAGES folder: ", "alignment:left");
      w1.sourceFolder2 = w1.g.add("edittext", undefined, "??????????", { readonly: false });
      w1.sourceFolder2.minimumSize.width = w1.sourceFolder2.maximumSize.width = 430;
      w1.sourceFolder2.text = dats.sourceFolder2;
      w1.btnSF2 = w1.g.add("button", undefined, "...");
      w1.btnSF2.onClick = function() {
          var ex = new Folder(w1.sourceFolder2.text);
          if (!ex.exists) ex = offbase;
          var off = Folder.selectDialog("Please choose IMAGES folder", ex);
          if (off === null) {
            return;
          }
          else {
            offbase = off.parent;
            w1.sourceFolder2.text = decodeURI(off.fsName);
          }
        };
      w1.btnSF2.maximumSize.width = 60;
      w1.btnSF2.alignment = ["right", "fill"];


      w1.g = tab1.add("group");
      w1.g.orientation = "row";
      w1.g.alignment = ["fill", "top"];
      w1.g.alignChildren = ["left", "fill"];
      w1.g.add("statictext", undefined, "OUTPUT folder: ", "alignment:left");
      w1.path1 = w1.g.add("edittext", undefined, "??????????", { readonly: false });
      w1.path1.minimumSize.width = w1.path1.maximumSize.width = 430;
      w1.path1.text = dats.outputFolder;
      w1.btn1 = w1.g.add("button", undefined, "...");
      w1.btn1.onClick = function() {
          var ex = new Folder(w1.path1.text);
          if (!ex.exists) ex = offbase;
          var off = Folder.selectDialog("Please choose OUTPUT folder", ex);
          if (off === null) {
            return;
          }
          else {
            offbase = off.parent;
            w1.path1.text = decodeURI(off.fsName);
          }
        };
      w1.btn1.maximumSize.width = 60;
      w1.btn1.alignment = ["right", "fill"];


      w1.g = tab1.add("group");
      w1.g.orientation = "row";

      w1.g = tab1.add("group");
      w1.g.orientation = "row";
      w1.g.alignment = ["fill", "top"];
      w1.g.alignChildren = ["left", "fill"];
      w1.chksaveJPEG = w1.g.add("checkbox", undefined, " Save as JPEG ", "");
      w1.chksaveJPEG.value = dats.chksaveJPEG;
      w1.chksaveJPEG.onClick = function() {
          if (!(w1.chksaveJPEG.value || w1.chksavePNG.value || w1.chksavePSD.value || w1.chksavePDF.value)) {
            w1.chksavePNG.value = true;
          }
          //if (w1.chksaveJPEG.value) {
          //  w1.chksaveJPEG.value = false;
          //}
        };
      w1.g = w1.g.add("group");
      w1.g.orientation = "row";
      w1.g.alignment = ["fill", "top"];
      w1.g.alignChildren = ["left", "fill"];
      w1.g.add("statictext", undefined, "Quality (1 - 12): ", "alignment:left");
      w1.quality = w1.g.add("edittext", undefined, '' + dats.quality);

      w1.g = tab1.add("group");
      w1.g.orientation = "row";
      w1.g.alignment = ["fill", "top"];
      w1.g.alignChildren = ["left", "fill"];
      w1.chksavePNG = w1.g.add("checkbox", undefined, " Save as PNG ", "");
      w1.chksavePNG.value = dats.chksavePNG;
      w1.chksavePNG.onClick = function() {
          if (!(w1.chksaveJPEG.value || w1.chksavePNG.value || w1.chksavePSD.value || w1.chksavePDF.value)) {
            w1.chksaveJPEG.value = true;
          }
        };
      w1.g = tab1.add("group");
      w1.g.orientation = "row";
      w1.g.alignment = ["fill", "top"];
      w1.g.alignChildren = ["left", "fill"];
      w1.chksavePSD = w1.g.add("checkbox", undefined, " Save as PSD ", "");
      w1.chksavePSD.alignment = ["left", "fill"];
      w1.chksavePSD.value = dats.chksavePSD;
      w1.chksavePSD.onClick = function() {
          if (!(w1.chksaveJPEG.value || w1.chksavePNG.value || w1.chksavePSD.value || w1.chksavePDF.value)) {
            w1.chksaveJPEG.value = true;
          }
        };

      if (!(w1.chksaveJPEG.value && w1.chksavePNG.value && w1.chksavePSD.value)) {
        w1.chksaveJPEG.value = true;
      }
      w1.g = tab1.add("group");
      w1.g.orientation = "row";
      w1.g.alignment = ["fill", "top"];
      w1.g.alignChildren = ["left", "fill"];
      w1.chksavePDF = w1.g.add("checkbox", undefined, " Save as PDF ", "");
      w1.chksavePDF.alignment = ["left", "fill"];
      w1.chksavePDF.value = dats.chksavePDF;
      w1.chksavePDF.onClick = function() {
          if (!(w1.chksaveJPEG.value || w1.chksavePNG.value || w1.chksavePSD.value || w1.chksavePDF.value)) {
            w1.chksaveJPEG.value = true;
          }
        };

      w1.grpm0 = w1.g.add("group");
      w1.grpm0.orientation = "row";
      w1.grpm0.alignment = ["fill", "top"];
      w1.grpm0.add("statictext", undefined, "PDF Preset: ", "alignment:left");
      w1.PdfPreset = w1.grpm0.add("edittext", undefined, dats.sizes);
      w1.PdfPreset.minimumSize.width = 200;
      w1.PdfPreset.text = dats.PdfPreset;

      if (!(w1.chksaveJPEG.value || w1.chksavePNG.value || w1.chksavePSD.value || w1.chksavePDF.value)) {
        w1.chksaveJPEG.value = true;
      }

      w1.grp4 = w1.add("group");
      w1.grp4.orientation = "row";
      w1.grp4.alignment = ["right", ""];
      var btnOk = w1.grp4.add("button", undefined, "OK",  { name:"ok" });
      btnOk.minimumSize.width = 180;
      var btnCa = w1.grp4.add("button", undefined, "Cancel", { name:"cancel" });

      btnOk.onClick = function() {
        w1.close(1);
      };


      var dret = w1.show();

      if (dret == 1) {
          return {
              "sourceFolder" : w1.path2.text,
              "sourceFolder2" : w1.sourceFolder2.text,
              "outputFolder" : w1.path1.text,

              "quality": w1.quality.text,
              "chksaveJPEG" : w1.chksaveJPEG.value,
              "chksavePNG" : w1.chksavePNG.value,
              "chksavePSD" : w1.chksavePSD.value,
              "chksavePDF" : w1.chksavePDF.value,
              "PdfPreset": w1.PdfPreset.text
            };
      }
      else {
          return null;
      }
    }
    catch (e) {
      alert(e.message + "\n" + e.line);
    }
  }

  function toolCrop(width, height, rel) {
    try {
      var rel0 = width / height;
      var wid = rel0 > rel ? height * rel : width;
      var hei = rel0 > rel ? height : width / rel;
      var wid2 = 600;
      var hei2 = wid2 / rel;

      var desc3 = new ActionDescriptor();
        var desc4 = new ActionDescriptor();
        desc4.putUnitDouble( charIDToTypeID( "Top " ), charIDToTypeID( "#Pxl" ), (height - hei) / 2 );
        desc4.putUnitDouble( charIDToTypeID( "Left" ), charIDToTypeID( "#Pxl" ), (width - wid) / 2 );
        desc4.putUnitDouble( charIDToTypeID( "Btom" ), charIDToTypeID( "#Pxl" ), (height + hei) / 2 );
        desc4.putUnitDouble( charIDToTypeID( "Rght" ), charIDToTypeID( "#Pxl" ), (width + wid) / 2 );
      desc3.putObject( charIDToTypeID( "T   " ), charIDToTypeID( "Rctn" ), desc4 );
      desc3.putUnitDouble( charIDToTypeID( "Angl" ), charIDToTypeID( "#Ang" ), 0.000000 );
      desc3.putUnitDouble( charIDToTypeID( "Wdth" ), charIDToTypeID( "#Pxl" ), wid2 );
      desc3.putUnitDouble( charIDToTypeID( "Hght" ), charIDToTypeID( "#Pxl" ), hei2 );
      desc3.putUnitDouble( charIDToTypeID( "Rslt" ), charIDToTypeID( "#Rsl" ), 300.000000 );

      executeAction( charIDToTypeID( "Crop" ), desc3, DialogModes.ALL );

      return true;
    }
    catch (ex) {
      return false;
    }
  }


  var g_title = 'genRePlaceImages 2';

  var RGXSKIPFILES = /^(\.DS_Store|Thumbs\.db)$/gi;

  var psource = File($.fileName).path;

  var options = new ExportOptionsSaveForWeb();
  options.quality = 100;
  options.format = SaveDocumentType.JPEG;
  options.optimized = true;

  var psdOptions = new PhotoshopSaveOptions;
  psdOptions.alphaChannels = true;
  psdOptions.annotations = true;
  psdOptions.embedColorProfile = true;
  psdOptions.layers = true;
  psdOptions.spotColors = true;

  var pngOpts = new ExportOptionsSaveForWeb;
  pngOpts.format = SaveDocumentType.PNG
  pngOpts.PNG8 = false;
  pngOpts.transparency = true;
  pngOpts.interlaced = false;
  pngOpts.quality = 100;


  var docRef;


  var startDisplayDialogs = app.displayDialogs;
  var strtRulerUnits = preferences.rulerUnits;
  app.displayDialogs = DialogModes.NO;
  preferences.rulerUnits = Units.PIXELS;

  try {

    var wFld = new Folder(Folder.userData + "/script");
    var fileprefs = new File(wFld + '/genRePlaceImages 2.prefs');
    var dats = {
        "sourceFolder": Folder.desktop.fullName,
        "sourceFolder2": Folder.desktop.fullName,
        "outputFolder": Folder.desktop.fullName,

        "quality": 12,
        "chksaveJPEG" : true,
        "chksavePNG" : false,
        "chksavePSD" : false,
        "chksavePDF" : false,
        "PdfPreset": "High Quality Print"

      };

    if (wFld.exists) {
      if (fileprefs.exists) readDats(fileprefs, dats);
    }
    else {
      wFld.create();
    }

    var dats = dlg_input(dats, g_title);
    if (!dats) return;

    saveDats(fileprefs, dats);

    dats.sourceFolder = new Folder(dats.sourceFolder);
    dats.sourceFolder2 = new Folder(dats.sourceFolder2);
    dats.outputFolder = new Folder(dats.outputFolder);

    dats.quality = Number(dats.quality);

    if (dats.quality === undefined || dats.quality < 1 || dats.quality > 12) {
      dats.quality = 12;
    }

    var psdOptions = new PhotoshopSaveOptions;
    psdOptions.alphaChannels = true;
    psdOptions.annotations = true;
    psdOptions.embedColorProfile = true;
    psdOptions.layers = true;
    psdOptions.spotColors = true;

    var optJPEG = new JPEGSaveOptions();
    optJPEG.quality = dats.quality;
    //var options = new ExportOptionsSaveForWeb();
    //options.quality = 80;
    //options.format = SaveDocumentType.JPEG;
    //options.optimized = true;

    var optPNG = new PNGSaveOptions();
    optPNG.compression = 9;
    optPNG.interlaced = false;
    //var pngOpts = new ExportOptionsSaveForWeb;
    //pngOpts.format = SaveDocumentType.PNG
    //pngOpts.PNG8 = false;
    //pngOpts.transparency = true;
    //pngOpts.quality = 100;

    var optPDF = new PDFSaveOptions();
    optPDF.presetFile = dats.PdfPreset;


    var curnum;
    var row;
    var num, lays, fxlay, wid0, wid2;

    var fileList0 = dats.sourceFolder.getFiles();
    var lenFileList = fileList0.length;
    var fileList = [];
    for (curnum = 0; curnum < lenFileList; curnum++) {
      if (!(fileList0[curnum] instanceof File) || RGXSKIPFILES.test(fileList0[curnum].name)) continue;
      fileList.push(fileList0[curnum]);
    }
    lenFileList = fileList.length;

    var fileList20 = dats.sourceFolder2.getFiles();
    var lenFileList2 = fileList20.length;
    var fileList2_ = [];
    var subs2_ = [];
    for (curnum = 0; curnum < lenFileList2; curnum++) {
      if (RGXSKIPFILES.test(fileList20[curnum].name)) continue;
      fileList2_.push(fileList20[curnum]);
      subs2_.push('');
    }
    //lenFileList2 = fileList2.length;


    for (curnum = 0; curnum < lenFileList; curnum++) {
      try {
        app.open(new File(fileList[curnum]));

        docRef = app.activeDocument;

                var desc93 = new ActionDescriptor();
                var idnull = charIDToTypeID( "null" );
                    var ref16 = new ActionReference();
                    var idlayerSection = stringIDToTypeID( "layerSection" );
                    ref16.putClass( idlayerSection );
                desc93.putReference( idnull, ref16 );
                var idlayerSectionStart = stringIDToTypeID( "layerSectionStart" );
                desc93.putInteger( idlayerSectionStart, 7 );
                var idlayerSectionEnd = stringIDToTypeID( "layerSectionEnd" );
                desc93.putInteger( idlayerSectionEnd, 8 );
                var idNm = charIDToTypeID( "Nm  " );
                desc93.putString( idNm, """Group 1""" );
                executeAction( charIDToTypeID( "Mk  " ), desc93, DialogModes.NO );

                var desc95 = new ActionDescriptor();
                var idnull = charIDToTypeID( "null" );
                    var ref17 = new ActionReference();
                    var idLyr = charIDToTypeID( "Lyr " );
                    var idOrdn = charIDToTypeID( "Ordn" );
                    var idTrgt = charIDToTypeID( "Trgt" );
                    ref17.putEnumerated( idLyr, idOrdn, idTrgt );
                desc95.putReference( idnull, ref17 );
                executeAction( charIDToTypeID( "Dlt " ), desc95, DialogModes.NO );
        
        lays = [];
        getLayersSmart(docRef, lays);
        //fxlay = lays[0];

        createNamedSnapshot("stp1");

        var fileList2 = [].concat(fileList2_);
        var subs2 = [].concat(subs2_);

  		while (fileList2.length > 0) {
        //for (ii = 0; ii < lenFileList2; ii++) {
  		  try {
  		    var plFile = fileList2.shift();
  		    var subfolder = subs2.shift();
  		    if (plFile instanceof Folder) {
  		      //fileList2 = fileList2.concat(plFile.getFiles());
              var fileList20 = plFile.getFiles();
              for (num = fileList20.length - 1; num > -1; num--) {
                if (RGXSKIPFILES.test(fileList20[num].name)) continue;
                fileList2.unshift(fileList20[num]);
                subs2.unshift(decodeURI('' + fileList20[num].parent.name));
              }// for
              continue;
  		    }

  		    for (num = lays.length - 1; num > -1; num--) {
  		      try {
                replaceContentsFit(lays[num], plFile);
              }
              catch (_) {
              }
            }
        	
        	nname = decodeURI(plFile.name);
        	nname = nname.substring(0, nname.lastIndexOf('.'));
        	nname = nname.trim2();

            // export

            nname = nname.replace(/[\"\&\+\<\>\:\'\/\\\|\?\*\%\,\.]/g, '');
            nname = nname.substring(0, 250);

            var docname = docRef.name.substring(0, docRef.name.lastIndexOf('.'));
            docname = decodeURI(docname);

            dats.newname = docname + '_' + nname;
            if (subfolder === '') {
              subfolder = nname;
//              dats.newname = docname + '_' + nname;
            }
//            else {
//              dats.newname = docname;
//            }
            dats.targetFolder = new Folder(dats.outputFolder + '/' + subfolder);
            dats.targetFolder.create();


            var newFile, newFile0;

            if (dats.chksaveJPEG) {
              newFile = new File(dats.targetFolder + '/' + dats.newname + '.jpg');
              docRef.saveAs(newFile, optJPEG, true, Extension.LOWERCASE);
            }
            if (dats.chksavePNG) {
              newFile0 = new File(dats.targetFolder + '/' + 'tmp-save-data2png' + '.png');
              newFile = new File(dats.targetFolder + '/' + dats.newname + '.png');
              docRef.exportDocument(newFile0, ExportType.SAVEFORWEB, pngOpts);
              try {
                try { newFile.remove(); } catch (_) { }
                newFile0.copy(newFile);
                try { newFile0.remove(); } catch (_) { }
              }
              catch (_) {
              }
            }
            if (dats.chksavePSD) {
              newFile = new File(dats.targetFolder + '/' + dats.newname + '.psd');
              docRef.saveAs(newFile);
            }
            if (dats.chksavePDF) {
              newFile = new File(dats.targetFolder + '/' + dats.newname + '.pdf');
              docRef.saveAs(newFile, optPDF, true, Extension.LOWERCASE);
            }
            
          }
          catch (ex) {
            alert('    Error: ' + ex.message + " - " + ex.line);
          }

          revertNamedSnapshot("stp1");
        } // for

      }
      catch (_) {
      }
      finally {
        try {
          docRef.close(SaveOptions.DONOTSAVECHANGES);
        }
        catch (_) {
        }
      }
    } // for
  }
  catch (ex) {
    alert('    Error: ' + ex.message + " - " + ex.line);
  }
  finally {
    preferences.rulerUnits = strtRulerUnits;
    app.displayDialogs = startDisplayDialogs;

    //deleteNamedSnapshot("stp1");
  }

  alert('Done!', g_title);

}();
