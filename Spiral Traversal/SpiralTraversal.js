function spiralTraversal (numCols,numRows,colStart,rowStart,direction)
{
    if(colStart==null || rowStart==null)
    {
        colStart=0;
        rowStart=0;
    }

    if(direction==null)
    {
        direction='down';
    }

    if(colStart>=numCols || rowStart>=numRows)
    {
        direction="stop";
    }

    switch(direction)
    {
           
        case 'down' : 
            for (i = rowStart; i < numRows; i++)
            {
                console.log('(' + i + ',' + colStart + ')');
            }
            colStart++;
            direction='right';
        break;
           
        case 'right' : 
            for (i = colStart; i < numCols; i++)
            {
                console.log('(' + (numRows-1) + ',' + i + ')');
            }
            numRows--;
            direction='up';
        break;
            
        case 'up' : 
            if ( colStart < numCols)
            {
                for (i = numRows-1; i >= rowStart; i--)
                {
                    console.log('(' + i + ',' + (numCols-1) + ')');
                }
                numCols--;
            }
            direction='left';
        break;

        case 'left' : 
            if (rowStart < numRows)
            {
                for (i = numCols-1; i >= colStart; i--)
                {
                    console.log('(' + rowStart + ',' + i + ')');
                }
                rowStart++;    
            } 
            direction='down';     
        break;

        default:
            return;
    }
    spiralTraversal (numCols,numRows,colStart,rowStart,direction);
}

spiralTraversal(6,4);