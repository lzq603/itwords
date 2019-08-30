package com.tunan.dao;

import com.tunan.domain.Word;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface WordDao {
    public Word getWord(int id);
    public Word getWordByWord(String word);
    public List<Word> getWords(@Param("start") Integer start, @Param("num") Integer num);
    public List<Word> getWordsByCategory(@Param("category")Integer category, @Param("start") Integer start, @Param("num") Integer num);
    public List<Word> searchWords(String key);
    public List<Word> mindWords(String key);
}
