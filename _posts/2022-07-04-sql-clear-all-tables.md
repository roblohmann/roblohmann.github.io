---
title:  "SQL - How to clear all data in all tables"
date:   2022-07-04 00:00:00 +0100
published: true
categories: blog
tags: sql
---
Recently I was working on a legacy project and had to create a copy of an existing database. This could only be done through the Azure Portal because I had no scripts or Entity Framework migrations available.

So I’ve chosen the pragmatic approach here and made a copy of the existing database in the Azure Portal. Once this was done I could access that database with my existing superuser on that Azure SQL Server.

Since I didn’t feel much like manually truncating all the tables manually (or write the sql-command for all the 22 tables) I did a quick google for an alternative. There I found a [topic on stackoverflow][1] which provided me with exactly the script I needed.

This is the full script the way I used it.

{% highlight sql %}
DECLARE @TableName NVARCHAR(MAX);
DECLARE tableCursor CURSOR FAST_FORWARD 
FOR 
Select Object_name(object_id) AS TableName from sys.objects where type = 'U'

OPEN tableCursor
FETCH NEXT FROM tableCursor INTO @TableName

WHILE (@@FETCH_STATUS <> -1)
BEGIN
IF (@@FETCH_STATUS <> -2)
BEGIN
DECLARE @statement NVARCHAR(200);
SET @statement = 'DELETE FROM ' + @TableName;
print @statement
print ''
execute sp_executesql @statement;
END
FETCH NEXT FROM tableCursor INTO @TableName
END
CLOSE tableCursor
DEALLOCATE tableCursor
{% endhighlight %}

[1]: https://stackoverflow.com/a/12713713