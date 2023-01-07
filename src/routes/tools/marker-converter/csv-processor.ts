interface MarkerData {
    timecode: string
    class: string
    username: string
    comment: string
}

export const process_csv = (str_data: string) => {
    const str_delimiter = ",";

    const obj_pattern = new RegExp(
        (
            `(\\${str_delimiter}|\\r?\\n|\\r|^)` +
            `(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|` +
            `([^\"\\${str_delimiter}\\r\\n]*))`
        ),
        "gi"
    );

    let arr_data = [[] as string[]];
    let arr_matches = null;

    while (arr_matches = obj_pattern.exec(str_data)) {
        let str_matched_delimiter = arr_matches[1];
        if (
            str_matched_delimiter.length &&
            (str_matched_delimiter != str_delimiter)
        ){
            arr_data.push( [] );
        }
        if (arr_matches[2]) {
            var str_matched_value = arr_matches[2].replace(/""/g, "\"");
        } else {
            var str_matched_value = arr_matches[3];
        }
        arr_data[arr_data.length-1].push(str_matched_value);
    }

    return arr_data.map(marker => ({
        timecode: marker[0],
        class: marker[1],
        username: marker[2],
        comment: marker[3]
    })).slice(0, -1);
}

export const process_marker_data = (data: MarkerData[]) => {
    const edl_data = data.map((marker, index) => {
        const [a, b, c] = marker.timecode.split(':');
        const timecode = `${(parseInt(a)+1).toLocaleString('en', {minimumIntegerDigits: 2})}:${b}:${c}`;
        const data = {
            start: `${timecode}:00`,
            end: `${timecode}:01`,
            iteration: (index+1).toLocaleString('en', {minimumIntegerDigits: 3}),
            name: `${marker.comment} by ${marker.username} [${marker.class}]`,
        }
        return `${data.iteration}  001      V    C        ${data.start} ${data.end} ${data.start} ${data.end}  \n |C:ResolveColorBlue |M:${data.name} |D:1\n\n`;
    }).join('');

    const header = "EDL\nTITLE: Timeline 1\nFCM:NON-DROP-FRAME\n\n";

    const processed = new Blob([header + edl_data], { type: 'text/plain' });
    return window.URL.createObjectURL(processed);
}