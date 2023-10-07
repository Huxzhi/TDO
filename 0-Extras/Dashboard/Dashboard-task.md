## 今日完成的工作

```dataview 
TASK 
FROM "3-Tasks"
WHERE (contains(tags, "#MT1") or contains(tags, "#MT2") orcontains(tags, "#MT3") orcontains(tags, "#MT4") ) AND file.day = date(today)

GROUP BY file.frontmatter.Project
SORT rows.file.date DESC
```


## 包含未完成工作的任务列表

```dataview
LIST

FROM "3-Tasks"
WHERE any(file.tasks, (t) => !t.completed and t.text  and !(t.due - date(now) <= dur(30 days) and t.due - date(now) >= dur(1 days))) 
```

%% t.text 为空的任务，不在统计中显示 %%



## 任务日历

```dataview
calendar file.day
where file.name != "Dashboard" AND file.day
```

## 包含已推迟（30内）工作的任务列表

```dataview
list
WHERE
 any(map(file.tasks, (t) => t.due - date(now) <= dur(30 days) and t.due - date(now) >= dur(1 days)))
```

