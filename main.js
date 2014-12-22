$(document).ready(function(){

    // --- Vars ---
    //var $rows = $tbody.find('tr'); // Don't use. It doesn't get updated when re-ordering via sort.
    var $headers = $('th');
    var $nav = $('ul.nav');

    var $show_ipads = $('button#show_ipads');
    
    var columns = get_id_dict($headers);


    // Create a dict from element id.
    // Dicts are easier and faster to traverse compared to arrays,
    // as long as the order isn't important.
    function get_id_dict($sel){
        var ids = {};
        $sel.each(function(i){
            ids[$(this).attr('id')] = i;
        });
        return ids;
    }
    function get_text_dict($sel){
        var texts = {};
        $sel.each(function(i){
            texts[$(this).text()] = i;
        });
        return texts;
    }


    // Sort column.
    // the two tables conflict and get mergede during sorting
    
    function sort_column(col, ascend, value_type){

        var value_type = value_type || "";
	
	var $parent_table = col.parents('table').eq(0);
	//console.log($parent_table);
        var $visible_rows = $parent_table.find('tbody tr');
	
        var rows_array = $visible_rows.toArray().sort(_comparer(col.index(), value_type));
        this.asc = !this.asc;
        if (typeof(ascend) === "boolean") this.asc = ascend;

        if (!this.asc){rows_array = rows_array.reverse()}
        for (var i = 0; i < rows_array.length; i++){ 
            //console.log(rows_array[i]);
            $parent_table.append(rows_array[i]) 
        }

        //console.log($rows[0]);
        //console.log($visible_rows.eq(0).text());

    }   
    function _comparer(index, value_type){
        var value_type = value_type || "";
        return function(a, b) {
            var valA = _getCellValue(a, index, value_type);
            var valB = _getCellValue(b, index, value_type);
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
        }
    }
    function _getCellValue(row, index, value_type){
        var value_type = value_type || "";
	//console.log($(row).text());
        return $(row).children('td').eq(index).text();
    }


    // Table sorting by clicking on column header.
    $headers.click(function(){

        sort_column($(this));

        // Stick rows with empty cells at the bottom.
        // Only need to do this for the store_price header fields.
        var index = $(this).index();
	$tbody = $(this).parents('table').eq(0).find('tbody');
        $tbody.find('tr').each(function(){
            if ($(this).find('td').eq(index).text() === ""){
                $(this).remove();
                $tbody.append($(this));
            }
        });

    });

    $show_ipads.click(function(){
	$('table#ipads').toggle();
	
    });


});
